import { ApiProperty } from '@nestjs/swagger';

export class GetBoxesFilterDto {
  @ApiProperty({ description: 'offset' })
  readonly page: string;

  @ApiProperty({ description: 'limit' })
  readonly size: string;
}
