import { Field, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@ObjectType({ description: 'The `Event` object type represents an real-time event.' })
export class Event {
  @Field()
  code: string
  
  @Field(() => JSON)
  data: any
  
  @Field()
  type: string
}