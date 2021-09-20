import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardDto {
  @Field()
  readonly userName!: string;

  @Field()
  readonly boardId!: number;

  @Field()
  readonly title!: string;

  @Field()
  readonly content!: string;
}
