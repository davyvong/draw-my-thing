import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The `Player` object type represents an player.' })
export class Player {
  @Field({ nullable: true })
  displayName?: string

  @Field(() => ID)
  id: string
}
