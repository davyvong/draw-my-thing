import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCors from 'fastify-cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.register(fastifyCors, { origin: true });
  await app.listen(parseInt(process.env.NEST_PORT, 10), process.env.NEST_HOST);
  Logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
}

bootstrap();
