import { Field, ObjectType } from '@nestjs/graphql';

import { Line } from './line.model';

@ObjectType({ description: 'The `Drawing` object type represents a drawing on the canvas.' })
export class Drawing {
  @Field()
  canvasHeight: number

  @Field()
  canvasWidth: number

  @Field(() => [Line])
  lines: Line[]

  @Field()
  strokeColor: string

  @Field()
  strokeWidth: number

  @Field()
  tool: string
}