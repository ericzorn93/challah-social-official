import { ConnectRouter } from '@connectrpc/connect';

import { elizav1 } from '@challah-social/protos-gen';

import { AppService } from './app/app.service';
import { INestApplication } from '@nestjs/common';

export default (
  app: INestApplication<any>
): ((router: ConnectRouter) => void) => {
  const appService = app.get<AppService>(AppService);

  return (router: ConnectRouter) => {
    router.service(elizav1.ElizaService, appService);
  };
};
