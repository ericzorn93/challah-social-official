import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, createClient, ServiceImpl } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-node';

import { authv1, datingSettingsv1 } from '@challah-social/protos-gen';

@Injectable()
export class AuthV1RPCService
  implements ServiceImpl<typeof authv1.AuthService>
{
  private readonly logger = new Logger(AuthV1RPCService.name);

  private readonly datingSettingsClient: Client<
    typeof datingSettingsv1.DatingSettingsService
  >;

  constructor(private readonly configService: ConfigService) {
    const datingServiceURL =
      this.configService.getOrThrow<string>('DATING_SERVICE_URL');

    const transport = createConnectTransport({
      httpVersion: '1.1',
      baseUrl: datingServiceURL,
    });
    this.datingSettingsClient = createClient(
      datingSettingsv1.DatingSettingsService,
      transport
    );

    this.logger.log('DatingSettingsClient initialized');
  }

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

    //
    await this.datingSettingsClient.placeholder({});

    return {
      $typeName: 'auth.v1.LogoutResponse',
    };
  }
}
