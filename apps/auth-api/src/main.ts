/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { expressConnectMiddleware } from '@connectrpc/connect-express';
import { createValidateInterceptor } from '@connectrpc/validate';
import { createServer } from 'node:http';

import routes from './router';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    expressConnectMiddleware({
      // Validation via Protovalidate is almost always recommended
      interceptors: [createValidateInterceptor()],
      routes: routes(app as any),
    })
  );

  await app.init();
  const httpAdapter = app.getHttpAdapter();

  if (process.env.NODE_ENV !== 'production') {
    Logger.log('Running in development mode');
    const server = createServer(httpAdapter.getInstance());
    server.listen(3000, '0.0.0.0');
    Logger.log(`🚀 Application is running on: http://localhost:3000`);
  } else {
    const server = createServer(httpAdapter.getInstance());
    server.listen(3000, 'fly-local-6pn');
    Logger.log(`🚀 Application is running on: http://fly-local-6pn:3000`);
  }
}

bootstrap();
