import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteUserDto {
  @Field()
  readonly id!: number;
}
