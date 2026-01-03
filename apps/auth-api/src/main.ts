import { expressConnectMiddleware } from '@connectrpc/connect-express';
import { createValidateInterceptor } from '@connectrpc/validate';

import routeHandler from './routeHandler';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const hostname = configService.getOrThrow<string>('HOSTNAME');
  const port = configService.getOrThrow<string>('PORT');

  // Register Connect middleware
  app.use(
    expressConnectMiddleware({
      routes: routeHandler(app),
      interceptors: [createValidateInterceptor()],
    })
  );

  await app.listen(port, hostname);
  Logger.log(`🚀 Auth API is running on: http://${hostname}:${port}`);
}

bootstrap();
