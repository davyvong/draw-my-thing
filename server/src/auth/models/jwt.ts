import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'The `Jst` object type represents an json web token.' })
export class Jwt {
  @Field({ nullable: true })
  exp?: number;

  @Field()
  iat: number;

  @Field()
  token: string;
}