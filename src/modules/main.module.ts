import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopsModule } from './shops/shops.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
			isGlobal: true,
		}),
		CacheModule.register({
			isGlobal: true,
		}),
		ShopsModule,
		UsersModule
	]
})
export class MainModule { }
