import { Logger } from '@nestjs/common';

import { type NestConnectRPCRouterFunction } from '@challah-social/nest-utils';
import { authv1 } from '@challah-social/protos-gen';

import { AuthV1RPCService } from './app/auth-v1/rpc';

const routerHandler: NestConnectRPCRouterFunction = (app) => {
  const authv1RPC = app.get(AuthV1RPCService);

  return (router) => {
    router.service(authv1.AuthService, authv1RPC as any);
    Logger.log('Registered auth.v1 RPC service', routerHandler.name);

    Logger.log('All RPC routes registered', routerHandler.name);
  };
};

export default routerHandler;
