import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteBoardDto {
  @Field()
  readonly userName!: string;

  @Field(() => ID)
  readonly boardId!: number;
}
