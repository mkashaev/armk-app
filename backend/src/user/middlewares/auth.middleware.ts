import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from 'src/config';
import { IExpressRequest } from '../types/expressRequest.interface';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
    }

    const token = req.headers.authorization;
    try {
      const decode = verify(token, SECRET_KEY);
      const user = await this.userService.getById(decode.id);
      req.user = user;
    } catch (err) {
      req.user = null;
    }

    next();
  }
}
