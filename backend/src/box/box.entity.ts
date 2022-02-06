import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entity/BaseEntity';

@Entity()
export class BoxEntity extends BaseEntity {
  @ApiProperty({ example: 'ПР-БК-19', description: 'Outer number of box' })
  @Property()
  number: string;

  @ApiProperty({ example: 'Блок-контейнер с душем, туалетом и раковиной', description: 'Title' })
  @Property()
  title: string;

  @ApiProperty({ example: 'Москва', description: 'Location' })
  @Property()
  location: string;

  @ApiProperty({ example: 'rent', description: 'Status' })
  @Property()
  status: string;

  @ApiProperty({ example: 'ООО Организация', description: 'Organization' })
  @Property()
  organization: string;

  @ApiProperty({ example: 'Жилой блок-контейнер, оборудованный ...', description: 'Description' })
  @Property()
  description: string;

  @ApiProperty({ example: '["http://photo.url"]', description: 'photoUrl' })
  @Property()
  imgUrls: string[];
}
