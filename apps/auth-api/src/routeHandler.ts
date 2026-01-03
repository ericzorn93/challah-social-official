import { type NestConnectRPCRouterFunction } from '@challah-social/nest-utils';

import { Logger } from '@nestjs/common';

const routerHandler: NestConnectRPCRouterFunction = (_app) => {
  return (_router) => {
    Logger.log('All RPC routes registered', routerHandler.name);
  };
};

export default routerHandler;
