import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatingSettingsV1Module } from './dating-settings-v1/dating-settings-v1.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatingSettingsV1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
