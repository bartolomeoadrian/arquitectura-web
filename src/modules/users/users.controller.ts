import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersDTO } from './users.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { nanoid } from 'nanoid'


@ApiTags('Users')
@Controller("/api")
export class UsersController {
	constructor(@Inject(CACHE_MANAGER) private cacheManager) { }

	@Get("/users")
	async list(@Res() res) {
		const users = await this.cacheManager.get('users') || [];

		return res.status(HttpStatus.OK).json(users);
	}

	@Post("/users")
	@ApiBody({ type: UsersDTO })
	async create(@Res() res, @Body() body: UsersDTO) {
		const users = await this.cacheManager.get('users') || [];
		const sha256 = require('sha256');
		const user = { id: nanoid(), ...body, password: sha256(body.password) };

		const exists = users.find((e) => e.username === user.username);
		if (exists) return res.status(HttpStatus.CONFLICT).json({ message: 'El usuario ya existe' });

		users.push(user);
		await this.cacheManager.set('users', users);

		return res.status(HttpStatus.CREATED).json(user);
	}

	@Get("/users/:userID")
	@ApiParam({ name: 'userID', type: String })
	async describe(@Res() res, @Param() params) {
		const users = await this.cacheManager.get('users') || [];

		const user = users.find((user) => user.id === params.userID);
		if (!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El usuario no existe' });

		return res.status(HttpStatus.OK).json(user);
	}

	@Put("/users/:userID")
	@ApiParam({ name: 'userID', type: String })
	@ApiBody({ type: UsersDTO })
	async update(@Res() res, @Param() params, @Body() body: UsersDTO) {
		const users = await this.cacheManager.get('users') || [];

		const index = users.findIndex((user) => user.id === params.userID);
		if (index < 0) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El usuario no existe' });

		const exists = users.find((e) => e.username === body.username);
		if (exists && exists.id !== params.userID) return res.status(HttpStatus.CONFLICT).json({ message: 'El usuario ya existe' });

		const sha256 = require('sha256');
		users[index] = { ...users[index], ...body, password: sha256(body.password) };
		await this.cacheManager.set('users', users);

		return res.status(HttpStatus.OK).json(users[index]);
	}

	@Delete("/users/:userID")
	@ApiParam({ name: 'userID', type: String })
	async delete(@Res() res, @Param() params) {
		const users = await this.cacheManager.get('users') || [];

		const index = users.findIndex((user) => user.id === params.userID);
		if (index < 0) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El usuario no existe' });

		users.splice(index, 1);
		await this.cacheManager.set('users', users);

		return res.status(HttpStatus.OK).json({ message: 'El usuario ha sido eliminado' });
	}
}
