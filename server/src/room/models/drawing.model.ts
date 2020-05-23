import { Field, ObjectType } from '@nestjs/graphql';

import { Line } from './line.model';

@ObjectType({ description: 'The `Line` object type represents a line on the canvas.' })
export class Drawing {
  @Field(() => [Line])
  lines: Line[]

  @Field()
  strokeColor: string

  @Field()
  strokeWidth: number
}