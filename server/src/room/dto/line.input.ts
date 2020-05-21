import { Field, InputType } from '@nestjs/graphql';

import { PointInput as Point } from './point.input';

@InputType({ description: 'The `Line` object type represents a line on the canvas.' })
export class LineInput {
  @Field(() => Point)
  start: Point

  @Field(() => Point)
  stop: Point
}