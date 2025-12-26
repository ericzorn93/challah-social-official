/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { expressConnectMiddleware } from '@connectrpc/connect-express';
import { createValidateInterceptor } from '@connectrpc/validate';
import { createServer } from 'node:http';
import { createServer as createServer2 } from 'node:http2';

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

  const server1 = createServer(httpAdapter.getInstance());
  server1.listen(3000, '0.0.0.0');
  Logger.log(`🚀 Application is running on: http://localhost:3000`);

  if (process.env.NODE_ENV === 'production') {
    const server2 = createServer(httpAdapter.getInstance());
    server2.listen(3000, 'fly-local-6pn');
    Logger.log(`🚀 Application is running on: http://fly-local-6pn:3000`);
  }
}

bootstrap();
