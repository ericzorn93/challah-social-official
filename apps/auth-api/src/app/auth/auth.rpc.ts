import { Injectable, Logger } from '@nestjs/common';
import { ServiceImpl } from '@connectrpc/connect';
import { authv1 } from '@challah-social/protos-gen';

import { RandomService } from './random.service';

@Injectable()
export class AuthRPC implements ServiceImpl<typeof authv1.AuthService> {
  private readonly logger = new Logger(AuthRPC.name);

  constructor(private readonly randomService: RandomService) {}

  // @ts-expect-error Implemented the interface method
  public async login(req: authv1.LoginRequest): Promise<authv1.LoginResponse> {
    this.logger.log('Received Say request', {
      random: this.randomService.getRandomNumber(),
      username: req.username,
    });

    return {
      $typeName: 'auth.v1.LoginResponse',
      token: crypto.randomUUID(),
    };
  }
}
