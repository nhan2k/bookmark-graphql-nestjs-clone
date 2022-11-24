import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsUrl, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateBookmarkInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  _id: string;

  @Field(() => [String])
  @IsArray()
  @IsUrl(undefined, { each: true })
  links: string[];
}
