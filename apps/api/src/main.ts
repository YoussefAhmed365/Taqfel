import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(process.env.PORT ?? 3001);

	app.useGlobalInterceptors(new TransformInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
}

await bootstrap();