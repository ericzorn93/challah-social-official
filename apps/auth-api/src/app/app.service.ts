import { Injectable, Logger } from '@nestjs/common';
import { ServiceImpl } from '@connectrpc/connect';
import {
  ElizaService,
  SayResponse,
  SayRequest,
} from '@challah-social/protos-gen';

@Injectable()
export class AppService implements ServiceImpl<typeof ElizaService> {
  private readonly logger = new Logger(AppService.name);

  public async say(_req: SayRequest): Promise<SayResponse> {
    this.logger.log('Received Say request');

    return {
      $typeName: 'connectrpc.eliza.v1.SayResponse',
      sentence: 'Hello from Testing ElizaService!',
    };
  }
}
