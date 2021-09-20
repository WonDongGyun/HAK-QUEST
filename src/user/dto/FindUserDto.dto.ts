import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserDto {
  @Field(() => ID)
  readonly id!: number;
}
