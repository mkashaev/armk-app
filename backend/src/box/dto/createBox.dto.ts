import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoxDto {
  @ApiProperty({ example: 'ПР-БК-19', description: 'Outer number of box' })
  @IsNotEmpty()
  readonly number: string;

  @ApiProperty({ example: 'Блок-контейнер с душем, туалетом и раковиной', description: 'Title' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'Москва', description: 'Location' })
  readonly location: string;

  @ApiProperty({ example: 'rent', description: 'Status' })
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({ example: 'ООО Организация', description: 'Organization' })
  readonly organization: string;

  @ApiProperty({ example: 'Жилой блок-контейнер, оборудованный ...', description: 'Description' })
  readonly description: string;

  @ApiProperty({ example: '["http://photo.url"]', description: 'photoUrl' })
  readonly imgUrls: string[];
}
