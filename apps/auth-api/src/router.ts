import { ConnectRouter } from '@connectrpc/connect';

import { type NestConnectRPCRouterFunction } from '@challah-social/nest-utils';
import { authv1 } from '@challah-social/protos-gen';

import { AuthRPC } from './app/auth/auth.rpc';

const routerFunction: NestConnectRPCRouterFunction = (app) => {
  const authRPC = app.get<AuthRPC>(AuthRPC);

  return (router: ConnectRouter) => {
    router.service(authv1.AuthService, authRPC as any);
  };
};

export default routerFunction;
