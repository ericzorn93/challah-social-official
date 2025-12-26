import { Injectable, Logger } from '@nestjs/common';
import { ServiceImpl } from '@connectrpc/connect';
import { elizav1 } from '@challah-social/protos-gen';

import { RandomService } from './random.service';

@Injectable()
export class AppService implements ServiceImpl<typeof elizav1.ElizaService> {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly randomService: RandomService) {}

  public async say(_req: elizav1.SayRequest): Promise<elizav1.SayResponse> {
    this.logger.log('Received Say request', {
      random: this.randomService.getRandomNumber(),
    });

    return {
      $typeName: 'connectrpc.eliza.v1.SayResponse',
      sentence: 'Hello from Testing ElizaService!',
    };
  }
}
