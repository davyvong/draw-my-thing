import { Field, InputType } from '@nestjs/graphql';

import { LineInput } from './line.input';

@InputType({ description: 'The `Drawing` object type represents a drawing on the canvas.' })
export class DrawingInput {
  @Field()
  canvasHeight: number

  @Field()
  canvasWidth: number

  @Field(() => [LineInput])
  lines: LineInput[]

  @Field()
  strokeColor: string

  @Field()
  strokeWidth: number

  @Field()
  tool: string
}