import { INestApplication } from '@nestjs/common';
import { ConnectRouter } from '@connectrpc/connect';

import { authv1 } from '@challah-social/protos-gen';

import { AuthService } from './app/auth.service';

export default (app: INestApplication): ((router: ConnectRouter) => void) => {
  const authService = app.get<AuthService>(AuthService);

  return (router: ConnectRouter) => {
    router.service(authv1.AuthService, authService as any);
  };
};
