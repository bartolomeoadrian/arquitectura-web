import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MainModule } from './main.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(MainModule, { cors: true });

	app.useGlobalFilters(new AllExceptionsFilter());
	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle(process.env.NAME)
		.setVersion(process.env.VERSION)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT);

	console.log(`Servicio iniciado en puerto ${process.env.PORT}`);
}

bootstrap();
