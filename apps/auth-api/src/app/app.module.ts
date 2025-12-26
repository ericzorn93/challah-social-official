import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { RandomService } from './random.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, RandomService],
  exports: [AppService],
})
export class AppModule {}
