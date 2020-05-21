import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The `Point` object type represents a point on the canvas.' })
export class Point {
  @Field()
  offsetX: number

  @Field()
  offsetY: number
}