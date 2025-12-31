/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { DatingSettingsV1RPC } from './rpc';

@Module({
  imports: [],
  controllers: [],
  providers: [DatingSettingsV1RPC],
  exports: [DatingSettingsV1RPC],
})
export class DatingSettingsV1Module {}
