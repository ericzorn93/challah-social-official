import { Module } from '@nestjs/common';

import { AuthV1RPCService } from './rpc';

@Module({
  providers: [AuthV1RPCService],
  exports: [AuthV1RPCService],
})
export class AuthV1Module {}
