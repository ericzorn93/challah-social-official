import { type NestConnectRPCRouterFunction } from '@challah-social/nest-utils';
import { datingSettingsv1 } from '@challah-social/protos-gen';

import { DatingSettingsV1RPC } from './app/dating-settings-v1/rpc';
import { Logger } from '@nestjs/common';

const routerHandler: NestConnectRPCRouterFunction = (app) => {
  const datingSettingsV1Rpc = app.get(DatingSettingsV1RPC);

  return (router) => {
    // Dating Settings V1 RPC routes
    router.service(
      datingSettingsv1.DatingSettingsService,
      datingSettingsV1Rpc as any
    );
    Logger.log('Registered Dating Settings V1 RPC routes', routerHandler.name);

    Logger.log('All RPC routes registered', routerHandler.name);
  };
};

export default routerHandler;
