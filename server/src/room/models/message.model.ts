import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The `Message` object type represents an chat message.' })
export class Message {
  @Field()
  id: string

  @Field()
  sender: string

  @Field()
  text: string

  @Field()
  timestamp: number
}