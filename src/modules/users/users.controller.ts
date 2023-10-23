import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersDTO } from './users.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@ApiTags('Users')
@Controller("/api")
export class UsersController {
	constructor(@Inject(CACHE_MANAGER) private cacheManager) { }

	@Get("/users")
	async list(@Res() res) {
		const users = await this.cacheManager.get('users');
		return res.status(HttpStatus.OK).json(users || []);
	}

	@Post("/users")
	@ApiBody({ type: UsersDTO })
	async create(@Res() res, @Body() body: UsersDTO) {
		//
	}

	@Get("/users/:userID")
	@ApiParam({ name: 'userID', type: Number })
	async describe(@Res() res, @Param() params) {
		//
	}

	@Put("/users/:userID")
	@ApiParam({ name: 'userID', type: Number })
	@ApiBody({ type: UsersDTO })
	async update(@Res() res, @Param() params, @Body() body: UsersDTO) {
		//
	}

	@Delete("/users/:userID")
	@ApiParam({ name: 'userID', type: Number })
	async delete(@Res() res, @Param() params) {
		//
	}
}
