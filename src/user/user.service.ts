import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto.dto';
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
  async findUser(args: number | string): Promise<User> {
    const findUser =
      typeof args === 'number'
        ? await this.usersRepository.findOne({
            where: {
              id: args,
            },
          })
        : await this.usersRepository.findOne({
            where: {
              name: args,
            },
          });

    if (!findUser) {
      throw new NotFoundUserException(args);
    }
    return findUser;
  }

  // 사용자 삭제
  async deleteUser(args: number): Promise<User> {
    const findUser = await this.findUser(args);
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
