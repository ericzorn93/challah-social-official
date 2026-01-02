import { ServiceImpl } from '@connectrpc/connect';
import { Injectable, Logger } from '@nestjs/common';

import { datingSettingsv1 } from '@challah-social/protos-gen';

@Injectable()
export class DatingSettingsV1RPC
  implements ServiceImpl<typeof datingSettingsv1.DatingSettingsService>
{
  private readonly logger = new Logger(DatingSettingsV1RPC.name);

  // @ts-expect-error: Implement your RPC methods here
  public async placeholder(
    _req: datingSettingsv1.PlaceholderRequest
  ): Promise<datingSettingsv1.PlaceholderResponse> {
    this.logger.log(`Received placeholder request at ${Date.now()}`);

    return {
      $typeName: 'datingsettings.v1.PlaceholderResponse' as const,
      message: `Hello from Dating Settings V1! ${new Date().toISOString()}`,
    };
  }
}
