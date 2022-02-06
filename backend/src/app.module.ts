// "@mikro-orm/core": "^4.5.10",
// "@mikro-orm/mongodb": "^4.5.10",
// "@mikro-orm/nestjs": "^4.3.1",

import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { BoxEntity } from './box/box.entity';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { BoxModule } from './box/box.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [UserEntity, BoxEntity],
      dbName: process.env.MONGO_DB_NAME || 'test-db',
      type: 'mongo',
      clientUrl: process.env.MONGO_URL || 'mongodb://admin:pass123@localhost:27017',
    }),
    UserModule,
    BoxModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
