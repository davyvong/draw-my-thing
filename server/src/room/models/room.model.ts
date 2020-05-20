import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Message } from './message.model';
import { Player } from './player.model';

@ObjectType({ description: 'The `Room` object type represents an room.' })
export class Room {
  @Field(() => [Message], { defaultValue: [] })
  chat: Message[]

  @Field()
  code: string

  @Field()
  createdBy: string

  @Field()
  createdOn: number

  @Field(() => ID)
  id: string

  @Field(() => [Player], { defaultValue: [] })
  players: Player[]
}