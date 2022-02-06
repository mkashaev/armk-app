import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { wrap } from '@mikro-orm/core';
import { EntityRepository, ObjectId } from '@mikro-orm/mongodb';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from 'src/config';
import { IUserResponse } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async getById(id: number): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOne({ _id: [new ObjectId(id)] });
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = userDto;
    if (!email && !password) {
      throw new HttpException('Not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const userByEmail = await this.userRepository.findOne({ email });
    if (userByEmail) {
      throw new HttpException('Email are taken', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      const newUser = new UserEntity();

      wrap(newUser).assign(userDto);
      await this.userRepository.persist(newUser).flush();
      delete newUser.password;
      return newUser;
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete user.password;

    return user;
  }

  generateJWT(user: UserEntity): string {
    return sign({ id: user.id, email: user.email }, SECRET_KEY);
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    delete user.password;

    return {
      ...user,
      token: this.generateJWT(user),
    };
  }
}
