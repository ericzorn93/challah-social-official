import { ServiceImpl } from '@connectrpc/connect';
import { Injectable } from '@nestjs/common';

import { datingSettingsv1 } from '@challah-social/protos-gen';

@Injectable()
export class DatingSettingsV1RPC
  implements ServiceImpl<typeof datingSettingsv1.DatingSettingsService>
{
  // @ts-expect-error: Implement your RPC methods here
  public async placeholder(
    _req: datingSettingsv1.PlaceholderRequest
  ): Promise<datingSettingsv1.PlaceholderResponse> {
    return {
      $typeName: 'datingsettings.v1.PlaceholderResponse' as const,
      message: 'Hello from Dating Settings V1!',
    };
  }
}
