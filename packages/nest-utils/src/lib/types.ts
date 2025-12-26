import { INestApplication } from '@nestjs/common';
import { ConnectRouter } from '@connectrpc/connect';

/**
 * A function that takes a NestJS application instance and returns a function
 * that configures a ConnectRouter with services.
 *
 * @param app - The NestJS application instance.
 * @returns A function that takes a ConnectRouter and configures it.
 */
export type NestConnectRPCRouterFunction = (
  app: INestApplication
) => (router: ConnectRouter) => void;
