import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardDto {
  @Field()
  readonly userName!: string;

  @Field()
  readonly title!: string;

  @Field()
  readonly content!: string;
}
