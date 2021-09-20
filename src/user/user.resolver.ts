import { UseFilters } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExceptionHandler } from 'src/global/ExceptionHandler';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { DeleteUserDto } from './dto/DeleteUserDto.dto';
import { FindUserDto } from './dto/FindUserDto.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver()
@UseFilters(ExceptionHandler)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // 사용자 생성
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    const createUser = await this.userService.createUser(createUserInput);
    return createUser;
  }

  // 사용자 찾기
  @Mutation(() => User)
  async findUser(
    @Args('findUserInput') findUserInput: FindUserDto,
  ): Promise<User> {
    const findUser = await this.userService.findUser(findUserInput);
    return findUser;
  }

  // 사용자 삭제
  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserInput') deleteUserInput: DeleteUserDto,
  ): Promise<User> {
    const deleteUser = await this.userService.deleteUser(deleteUserInput);
    return deleteUser;
  }
}
