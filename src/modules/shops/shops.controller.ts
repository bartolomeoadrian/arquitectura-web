import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ShopsDTO } from './shops.dto';

@ApiTags('Shops')
@Controller("/api")
export class ShopsController {

	@Get("/shops")
	async list(@Res() res) {
		//
	}

	@Post("/shops")
	@ApiBody({ type: ShopsDTO })
	async create(@Res() res, @Body() body: ShopsDTO) {
		//
	}

	@Get("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	async describe(@Res() res, @Param() params) {
		//
	}

	@Put("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	@ApiBody({ type: ShopsDTO })
	async update(@Res() res, @Param() params, @Body() body: ShopsDTO) {
		//
	}

	@Delete("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	async delete(@Res() res, @Param() params) {
		//
	}
}
