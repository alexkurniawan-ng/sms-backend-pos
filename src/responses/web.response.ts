import { ApiProperty } from '@nestjs/swagger';

export interface WebResponseSync<T> {
  code: number;
  status: string;
  data: T;
}

export class CreatedWebResponse<T> {
  @ApiProperty({ default: 201 })
  code: number;

  @ApiProperty({ default: 'Created' })
  status: string;

  data: T;
}

export type WebResponse<T> = Promise<WebResponseSync<T>>;
