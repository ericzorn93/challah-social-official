import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RandomService } from './random.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, RandomService],
  exports: [AuthService],
})
export class AppModule {}
