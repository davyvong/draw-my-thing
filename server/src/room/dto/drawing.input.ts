import { Field, InputType } from '@nestjs/graphql';

import { LineInput } from './line.input';

@InputType({ description: 'The `Line` object type represents a line on the canvas.' })
export class DrawingInput {
  @Field(() => [LineInput])
  lines: LineInput[]

  @Field()
  strokeColor: string

  @Field()
  strokeWidth: number
}