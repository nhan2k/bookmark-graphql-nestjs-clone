import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract.module';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  readonly email: string;
}
