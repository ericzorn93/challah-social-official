import { Injectable, Logger } from '@nestjs/common';
import { ServiceImpl } from '@connectrpc/connect';

import { authv1 } from '@challah-social/protos-gen';

@Injectable()
export class AuthV1RPCService
  implements ServiceImpl<typeof authv1.AuthService>
{
  private readonly logger = new Logger(AuthV1RPCService.name);

  // @ts-expect-error: Login Request
  public async login(_req: authv1.LoginRequest): Promise<authv1.LoginResponse> {
    this.logger.log('Login request received');

    return {
      $typeName: 'auth.v1.LoginResponse',
      accessToken: crypto.randomUUID(),
    };
  }

  // @ts-expect-error: Logout Request
  public async logout(
    _req: authv1.LogoutRequest
  ): Promise<authv1.LogoutResponse> {
    this.logger.log('Logout request received');

    return {
      $typeName: 'auth.v1.LogoutResponse',
    };
  }
}
