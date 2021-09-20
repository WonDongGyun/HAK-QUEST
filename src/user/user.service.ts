import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { DeleteUserDto } from './dto/DeleteUserDto.dto';
import { FindUserDto } from './dto/FindUserDto.dto';
import { NotFoundUserException } from './exception/NotFoundUserException';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    console.log('use this repository user', User);
  }

  // 사용자 생성
  async createUser(args: CreateUserDto): Promise<User> {
    return this.usersRepository.save(args);
  }

  // 사용자 찾기
  async findUser(args: FindUserDto): Promise<User> {
    const findUser = await this.usersRepository.findOne({
      where: {
        id: args.id,
      },
    });

    if (!findUser) {
      throw new NotFoundUserException(args.id);
    }
    return findUser;
  }

  // 사용자 삭제
  async deleteUser(args: DeleteUserDto): Promise<User> {
    const findUser = await this.usersRepository.findOne({
      where: {
        id: args.id,
      },
    });

    if (!findUser) {
      throw new NotFoundUserException(args.id);
    }

    await this.usersRepository.softDelete({
      id: findUser.id,
    });

    const deleteUser = await this.usersRepository.findOne({
      where: { id: findUser.id },
      withDeleted: true,
    });

    return deleteUser;
  }
}
