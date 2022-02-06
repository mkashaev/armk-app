import { Request } from 'express';
import { UserEntity } from 'src/user/user.entity';

export interface IExpressRequest extends Request {
  user?: UserEntity;
}
