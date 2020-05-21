import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The `Message` object type represents an chat message.' })
export class Message {
  @Field()
  id: string

  @Field({ nullable: true })
  sender: string

  @Field({ nullable: true })
  text: string

  @Field()
  timestamp: number

  @Field()
  type: string
}