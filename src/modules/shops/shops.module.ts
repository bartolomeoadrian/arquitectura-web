import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { CarsModule } from './cars/cars.module';

@Module({
	imports: [CarsModule],
	controllers: [ShopsController],
})
export class ShopsModule { }
