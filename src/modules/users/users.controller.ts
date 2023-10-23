import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersDTO } from './users.dto';

@ApiTags('Users')
@Controller("/api")
export class UsersController {

	@Get("/users")
	async list() {
		//
	}

	@Post("/users")
	@ApiBody({ type: UsersDTO })
	async create(@Body() body: UsersDTO) {
		//
	}

	@Get("/users/:userID")
	@ApiParam({ name: 'userID', type: Number })
	async describe(@Param() params) {
		//
	}

	@Put("/users/:userID")
	@ApiParam({ name: 'userID', type: Number })
	@ApiBody({ type: UsersDTO })
	async update(@Param() params, @Body() body: UsersDTO) {
		//
	}

	@Delete("/users/:userID")
	@ApiParam({ name: 'userID', type: Number })
	async delete(@Param() params) {
		//
	}
}
