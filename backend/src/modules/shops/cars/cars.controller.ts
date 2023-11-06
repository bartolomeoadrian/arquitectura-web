import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CarsDTO } from './cars.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { nanoid } from 'nanoid';

@ApiTags('Shops')
@Controller("/api/shops/:shopID")
export class CarsController {
	constructor(@Inject(CACHE_MANAGER) private cacheManager) { }

	@Get("/cars")
	@ApiParam({ name: 'shopID', type: String })
	async list(@Res() res, @Param() params) {
		const shops = await this.cacheManager.get('shops') || [];

		const shop = shops.find((shop) => shop.id === params.shopID);
		if (!shop) return res.status(HttpStatus.NOT_FOUND).json({ message: 'La tienda no existe' });

		const cars = await this.cacheManager.get('cars') || [];

		return res.status(HttpStatus.OK).json(cars);
	}

	@Post("/cars")
	@ApiParam({ name: 'shopID', type: String })
	@ApiBody({ type: CarsDTO })
	async create(@Res() res, @Param() params, @Body() body: CarsDTO) {
		const shops = await this.cacheManager.get('shops') || [];

		const shop = shops.find((shop) => shop.id === params.shopID);
		if (!shop) return res.status(HttpStatus.NOT_FOUND).json({ message: 'La tienda no existe' });

		const cars = await this.cacheManager.get('cars') || [];
		const car = { id: nanoid(), ...body, shopID: shop.id, bought: false };

		cars.push(car);
		await this.cacheManager.set('cars', cars);

		return res.status(HttpStatus.CREATED).json(car);
	}

	@Get("/cars/:carID")
	@ApiParam({ name: 'shopID', type: String })
	@ApiParam({ name: 'carID', type: Number })
	async describe(@Res() res, @Param() params) {
		const shops = await this.cacheManager.get('shops') || [];

		const shop = shops.find((shop) => shop.id === params.shopID);
		if (!shop) return res.status(HttpStatus.NOT_FOUND).json({ message: 'La tienda no existe' });

		const cars = await this.cacheManager.get('cars') || [];

		const car = cars.find((car) => car.id === params.carID && car.shopID === shop.id);
		if (!car) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El auto no existe' });

		return res.status(HttpStatus.OK).json(car);
	}

	@Put("/cars/:carID")
	@ApiParam({ name: 'shopID', type: String })
	@ApiParam({ name: 'carID', type: Number })
	@ApiBody({ type: CarsDTO })
	async update(@Res() res, @Param() params, @Body() body: CarsDTO) {
		const shops = await this.cacheManager.get('shops') || [];

		const shop = shops.find((shop) => shop.id === params.shopID);
		if (!shop) return res.status(HttpStatus.NOT_FOUND).json({ message: 'La tienda no existe' });

		const cars = await this.cacheManager.get('cars') || [];

		const index = cars.findIndex((car) => car.id === params.carID && car.shopID === shop.id);
		if (index < 0) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El auto no existe' });

		cars[index] = { ...cars[index], ...body };
		await this.cacheManager.set('cars', cars);

		return res.status(HttpStatus.OK).json(cars[index]);
	}

	@Delete("/cars/:carID")
	@ApiParam({ name: 'shopID', type: String })
	@ApiParam({ name: 'carID', type: Number })
	async delete(@Res() res, @Param() params) {
		const shops = await this.cacheManager.get('shops') || [];

		const shop = shops.find((shop) => shop.id === params.shopID);
		if (!shop) return res.status(HttpStatus.NOT_FOUND).json({ message: 'La tienda no existe' });

		const cars = await this.cacheManager.get('cars') || [];

		const index = cars.findIndex((car) => car.id === params.carID && car.shopID === shop.id);
		if (index < 0) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El auto no existe' });

		cars.splice(index, 1);
		await this.cacheManager.set('cars', cars);

		return res.status(HttpStatus.OK).json({ message: 'El auto ha sido eliminado' });
	}

	@Post("/cars/:carID/buy")
	@ApiParam({ name: 'shopID', type: String })
	@ApiParam({ name: 'carID', type: Number })
	@ApiBody({ type: CarsDTO })
	async buy(@Res() res, @Param() params) {
		const shops = await this.cacheManager.get('shops') || [];

		const shop = shops.find((shop) => shop.id === params.shopID);
		if (!shop) return res.status(HttpStatus.NOT_FOUND).json({ message: 'La tienda no existe' });

		const cars = await this.cacheManager.get('cars') || [];

		const index = cars.findIndex((car) => car.id === params.carID && car.shopID === shop.id);
		if (index < 0) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El auto no existe' });

		if (cars[index].bought) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'El auto ya ha sido comprado' });

		cars[index] = { ...cars[index], bought: true };
		await this.cacheManager.set('cars', cars);

		return res.status(HttpStatus.OK).json(cars[index]);
	}
}
