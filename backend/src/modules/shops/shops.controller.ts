import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ShopsDTO } from './shops.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { nanoid } from 'nanoid'

@ApiTags('Shops')
@Controller("/api")
export class ShopsController {
	constructor(@Inject(CACHE_MANAGER) private cacheManager) { }

	@Get("/shops")
	async list(@Res() res) {
		const shops = await this.cacheManager.get('shops') || [];

		return res.status(HttpStatus.OK).json(shops);
	}

	@Post("/shops")
	@ApiBody({ type: ShopsDTO })
	async create(@Res() res, @Body() body: ShopsDTO) {
		const shops = await this.cacheManager.get('shops') || [];
		const shop = { id: nanoid(), ...body };

		shops.push(shop);
		await this.cacheManager.set('shops', shops);

		return res.status(HttpStatus.CREATED).json(shop);
	}

	@Get("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	async describe(@Res() res, @Param() params) {
		const shops = await this.cacheManager.get('shops') || [];

		const shop = shops.find((shop) => shop.id === params.shopID);
		if (!shop) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El shop no existe' });

		return res.status(HttpStatus.OK).json(shop);
	}

	@Put("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	@ApiBody({ type: ShopsDTO })
	async update(@Res() res, @Param() params, @Body() body: ShopsDTO) {
		const shops = await this.cacheManager.get('shops') || [];

		const index = shops.findIndex((shop) => shop.id === params.shopID);
		if (index < 0) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El shop no existe' });

		shops[index] = { ...shops[index], ...body };
		await this.cacheManager.set('shops', shops);

		return res.status(HttpStatus.OK).json(shops[index]);
	}

	@Delete("/shops/:shopID")
	@ApiParam({ name: 'shopID', type: Number })
	async delete(@Res() res, @Param() params) {
		const shops = await this.cacheManager.get('shops') || [];

		const index = shops.findIndex((shop) => shop.id === params.shopID);
		if (index < 0) return res.status(HttpStatus.NOT_FOUND).json({ message: 'El shop no existe' });

		shops.splice(index, 1);
		await this.cacheManager.set('shops', shops);

		return res.status(HttpStatus.OK).json({ message: 'El shop ha sido eliminado' });
	}
}
