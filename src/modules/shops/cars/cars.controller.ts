import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CarsDTO } from './cars.dto';

@ApiTags('Shops')
@Controller("/api/shops/:shopID")
export class CarsController {

	@Get("/cars")
	async list() {
		//
	}

	@Post("/cars")
	@ApiBody({ type: CarsDTO })
	async create(@Body() body: CarsDTO) {
		//
	}

	@Get("/cars/:carID")
	@ApiParam({ name: 'carID', type: Number })
	async describe(@Param() params) {
		//
	}

	@Put("/cars/:carID")
	@ApiParam({ name: 'carID', type: Number })
	@ApiBody({ type: CarsDTO })
	async update(@Param() params, @Body() body: CarsDTO) {
		//
	}

	@Delete("/cars/:carID")
	@ApiParam({ name: 'carID', type: Number })
	async delete(@Param() params) {
		//
	}

	@Post("/cars/:carID/buy")
	@ApiParam({ name: 'carID', type: Number })
	@ApiBody({ type: CarsDTO })
	async buy(@Param() params, @Body() body: CarsDTO) {
		//
	}
}
