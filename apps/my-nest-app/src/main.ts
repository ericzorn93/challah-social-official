/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { expressConnectMiddleware } from '@connectrpc/connect-express';
import { createValidateInterceptor } from '@connectrpc/validate';

import routes from './router';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    expressConnectMiddleware({
      // Validation via Protovalidate is almost always recommended
      interceptors: [createValidateInterceptor()],
      routes: routes(app),
    })
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
