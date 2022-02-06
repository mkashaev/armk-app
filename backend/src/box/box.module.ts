import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BoxController } from './box.controller';
import { BoxService } from './box.service';
import { BoxEntity } from './box.entity';

@Module({
  imports: [MikroOrmModule.forFeature([BoxEntity])],
  controllers: [BoxController],
  providers: [BoxService],
})
export class BoxModule {}
