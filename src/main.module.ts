import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopsModule } from './modules/shops/shops.module';
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
			isGlobal: true,
		}), ShopsModule, UsersModule
	]
})
export class MainModule { }
