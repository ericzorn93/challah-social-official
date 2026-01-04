import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Client,
  createClient,
  ServiceImpl,
  HandlerContext,
} from '@connectrpc/connect';
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

    const client = createClient(
      datingSettingsv1.DatingSettingsService,
      transport
    );

    this.datingSettingsClient = client;

    this.logger.log('DatingSettingsClient initialized');
  }

  // @ts-expect-error: Login Request
  public async login(
    req: authv1.LoginRequest,
    _ctx: HandlerContext
  ): Promise<authv1.LoginResponse> {
    this.logger.log('Login request received', req);

    // Call the dating settings service
    const response = await this.datingSettingsClient.getDatingSettings({
      userId: req.username,
    });

    this.logger.log('Received dating settings response', response);

    return {
      $typeName: 'auth.v1.LoginResponse',
      accessToken: crypto.randomUUID(),
    };
  }

  // @ts-expect-error: Logout Request
  public async logout(
    req: authv1.LogoutRequest,
    _ctx: HandlerContext
  ): Promise<authv1.LogoutResponse> {
    this.logger.log('Logout request received', req);

    // Call the dating settings service
    await this.datingSettingsClient.placeholder({});

    return {
      $typeName: 'auth.v1.LogoutResponse',
    };
  }
}
