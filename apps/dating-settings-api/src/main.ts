import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { expressConnectMiddleware } from '@connectrpc/connect-express';
import { createValidateInterceptor } from '@connectrpc/validate';

import routerHandler from './routeHandler';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isProd = process.env.NODE_ENV === 'production';
  const port = 3000;
  let hostname = '0.0.0.0';

  if (isProd) {
    app.enableShutdownHooks();
    hostname = 'fly-local-6pn';
  }

  // Register Connect middleware
  app.use(
    expressConnectMiddleware({
      routes: routerHandler(app),
      interceptors: [createValidateInterceptor()],
    })
  );

  await app.listen(port, hostname);
  Logger.log(`🚀 Application is running on: http://${hostname}:${port}`);
}

bootstrap();
