import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Drawing } from './drawing.model';
import { Message } from './message.model';
import { Player } from './player.model';

@ObjectType({ description: 'The `Room` object type represents an room.' })
export class Room {
  @Field(() => [Message], { defaultValue: [] })
  chat?: Message[]

  @Field()
  code: string

  @Field()
  createdBy: string

  @Field()
  createdOn: number

  @Field(() => [Drawing], { defaultValue: [] })
  drawing?: Drawing[]

  @Field({ nullable: true })
  drawingPlayer?: string

  drawingPlayerCursor: number

  @Field({ defaultValue: false })
  gameStarted: boolean

  @Field(() => ID)
  id: string

  @Field(() => [Player], { defaultValue: [] })
  players?: Player[]

  @Field({ nullable: true })
  roundEndTime?: number

  @Field({ nullable: true })
  roundStartTime?: number

  @Field({ nullable: true })
  secretWord?: string
}