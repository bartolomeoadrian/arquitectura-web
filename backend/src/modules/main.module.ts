import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopsModule } from './shops/shops.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as redisStore from 'cache-manager-redis-store';

const redisConfig = {
	store: redisStore,
	host: 'localhost',
	port: 6379,
}

const defaultCacheConfig = {
	isGlobal: true,
	ttl: 0,
}

const cacheConfig = process.env.NODE_ENV === 'production' ? { ...defaultCacheConfig, ...redisConfig } : defaultCacheConfig;

@Module({
	imports: [
		CacheModule.register(cacheConfig),
		ConfigModule.forRoot({
			envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: `${process.cwd()}/../frontend/dist`,
		}),
		ShopsModule,
		UsersModule
	]
})
export class MainModule { }
