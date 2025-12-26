import { Injectable, Logger } from '@nestjs/common';
import { ServiceImpl } from '@connectrpc/connect';
import { authv1 } from '@challah-social/protos-gen';

import { RandomService } from './random.service';

@Injectable()
export class AppService implements ServiceImpl<typeof authv1.AuthService> {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly randomService: RandomService) {}

  // @ts-expect-error: disable line
  public async login(_req: authv1.LoginRequest): Promise<authv1.LoginResponse> {
    this.logger.log('Received Say request', {
      random: this.randomService.getRandomNumber(),
    });

    return {
      $typeName: 'auth.v1.LoginResponse',
      token: crypto.randomUUID(),
    };
  }
}
