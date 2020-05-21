import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'The `Point` object type represents a point on the canvas.' })
export class PointInput {
  @Field()
  offsetX: number

  @Field()
  offsetY: number
}