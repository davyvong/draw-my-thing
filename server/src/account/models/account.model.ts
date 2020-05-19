import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The `Account` object type represents an account.' })
export class Account {
  @Field()
  displayName: string;

  @Field(() => ID)
  id: string;
}