import { HttpStatus } from '@nestjs/common';

import { WebResponseSync } from './web.response';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ok(response: any): WebResponseSync<any> {
  return {
    code: HttpStatus.OK,
    status: 'OK',
    data: response,
  };
}
