import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CarsDTO } from './cars.dto';

@ApiTags('Shops')
@Controller("/api/shops/:shopID")
export class CarsController {

	@Get("/cars")
	async list(@Res() res) {
		//
	}

	@Post("/cars")
	@ApiBody({ type: CarsDTO })
	async create(@Res() res, @Body() body: CarsDTO) {
		//
	}

	@Get("/cars/:carID")
	@ApiParam({ name: 'carID', type: Number })
	async describe(@Res() res, @Param() params) {
		//
	}

	@Put("/cars/:carID")
	@ApiParam({ name: 'carID', type: Number })
	@ApiBody({ type: CarsDTO })
	async update(@Res() res, @Param() params, @Body() body: CarsDTO) {
		//
	}

	@Delete("/cars/:carID")
	@ApiParam({ name: 'carID', type: Number })
	async delete(@Res() res, @Param() params) {
		//
	}

	@Post("/cars/:carID/buy")
	@ApiParam({ name: 'carID', type: Number })
	@ApiBody({ type: CarsDTO })
	async buy(@Res() res, @Param() params, @Body() body: CarsDTO) {
		//
	}
}
