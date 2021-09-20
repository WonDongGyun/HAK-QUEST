import { UseFilters } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExceptionHandler } from 'src/global/ExceptionHandler';
import { CreateUserDto } from './dto/CreateUserDto.dto';
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

  // 사용자 삭제
  @Mutation(() => User)
  async deleteUser(@Args('id') id: number): Promise<User> {
    const deleteUser = await this.userService.deleteUser(id);
    return deleteUser;
  }

  // 사용자 찾기
  @Query(() => User)
  async findUser(@Args('id') id: number): Promise<User> {
    console.log(typeof id);
    const findUser = await this.userService.findUser(id);
    return findUser;
  }
}
