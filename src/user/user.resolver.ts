import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    const createUser = await this.userService.createUser(createUserInput);
    return createUser;
  }
}
