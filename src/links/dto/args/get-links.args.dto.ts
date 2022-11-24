import { ArgsType, Field } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@ArgsType()
export class GetLinkArgs {
  @Field(() => [String])
  @IsUrl(undefined, { each: true })
  urls: string[];
}
