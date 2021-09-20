import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteUserDto {
  @Field(() => ID)
  readonly id!: number;
}
