import { Module } from '@nestjs/common';

import { RandomService } from './random.service';
import { AuthRPC } from './auth.rpc';

@Module({
  providers: [RandomService, AuthRPC],
  exports: [AuthRPC],
})
export class AuthModule {}
