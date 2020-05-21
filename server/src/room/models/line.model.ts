import { Field, ObjectType } from '@nestjs/graphql';

import { Point } from './point.model';

@ObjectType({ description: 'The `Line` object type represents a line on the canvas.' })
export class Line {
  @Field(() => Point)
  start: Point

  @Field(() => Point)
  stop: Point
}