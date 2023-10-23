import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ShopsDTO } from './shops.dto';

@ApiTags('Shops')
@Controller("/api")
export class ShopsController {

	@Get("/shops")
	async list() {
		//
	}

	@Post("/shops")
	@ApiBody({ type: ShopsDTO })
	async create(@Body() body: ShopsDTO) {
		//
	}

	@Get("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	async describe(@Param() params) {
		//
	}

	@Put("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	@ApiBody({ type: ShopsDTO })
	async update(@Param() params, @Body() body: ShopsDTO) {
		//
	}

	@Delete("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	async delete(@Param() params) {
		//
	}
}
