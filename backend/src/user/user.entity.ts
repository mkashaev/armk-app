import { BeforeCreate, Entity, Property } from '@mikro-orm/core';
import { hash } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entity/BaseEntity';

@Entity()
export class UserEntity extends BaseEntity {
  @ApiProperty({ example: 'mail@gmail.com', description: 'Email' })
  @Property()
  email: string;

  @ApiProperty({ example: 'Ivan', description: 'Name' })
  @Property()
  username: string;

  @Property()
  password: string;

  @BeforeCreate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
