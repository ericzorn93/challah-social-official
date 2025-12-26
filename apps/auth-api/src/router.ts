import { INestApplication } from '@nestjs/common';
import { ConnectRouter } from '@connectrpc/connect';

import { elizav1 } from '@challah-social/protos-gen';

import { AppService } from './app/app.service';

export default (app: INestApplication): ((router: ConnectRouter) => void) => {
  const appService = app.get<AppService>(AppService);

  return (router: ConnectRouter) => {
    router.service(elizav1.ElizaService, appService);
  };
};
