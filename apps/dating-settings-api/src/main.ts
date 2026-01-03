import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { expressConnectMiddleware } from '@connectrpc/connect-express';
import { createValidateInterceptor } from '@connectrpc/validate';

import routerHandler from './routeHandler';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<string>('PORT');
  const hostname = configService.getOrThrow<string>('HOSTNAME');

  // Register Connect middleware
  app.use(
    expressConnectMiddleware({
      routes: routerHandler(app),
      interceptors: [createValidateInterceptor()],
    })
  );

  await app.listen(port, hostname);
  Logger.log(
    `🚀 Dating Settings API is running on: http://${hostname}:${port}`
  );
}

bootstrap();
