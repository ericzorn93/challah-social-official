import { INestApplication } from '@nestjs/common';
import { ConnectRouter } from '@connectrpc/connect';

import { authv1 } from '@challah-social/protos-gen';

import { AuthRPC } from './app/auth/auth.rpc';

export default (app: INestApplication): ((router: ConnectRouter) => void) => {
  const authRPC = app.get<AuthRPC>(AuthRPC);

  return (router: ConnectRouter) => {
    router.service(authv1.AuthService, authRPC as any);
  };
};
