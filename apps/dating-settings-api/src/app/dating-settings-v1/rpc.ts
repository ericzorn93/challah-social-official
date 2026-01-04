import { HandlerContext, ServiceImpl } from '@connectrpc/connect';
import { Injectable, Logger } from '@nestjs/common';

import { datingSettingsv1 } from '@challah-social/protos-gen';

@Injectable()
export class DatingSettingsV1RPC
  implements ServiceImpl<typeof datingSettingsv1.DatingSettingsService>
{
  private readonly logger = new Logger(DatingSettingsV1RPC.name);

  // @ts-expect-error: Placeholder Request
  public async placeholder(
    _req: datingSettingsv1.PlaceholderRequest,
    _ctx: HandlerContext
  ): Promise<datingSettingsv1.PlaceholderResponse> {
    this.logger.log(`Received placeholder request at ${Date.now()}`);

    return {
      $typeName: 'datingsettings.v1.PlaceholderResponse' as const,
      message: `Hello from Dating Settings V1! ${new Date().toISOString()}`,
    };
  }

  // @ts-expect-error: GetDatingSettings Request
  public async getDatingSettings(
    req: datingSettingsv1.GetDatingSettingsRequest,
    _ctx: HandlerContext
  ): Promise<datingSettingsv1.GetDatingSettingsResponse> {
    this.logger.log(
      `Received getDatingSettings request for userId: ${req.userId}`
    );

    // Placeholder implementation
    return {
      $typeName: 'datingsettings.v1.GetDatingSettingsResponse',
      settings: {
        $typeName: 'datingsettings.v1.DatingSettings',
        isOpenToDating: true,
      },
    };
  }
}
