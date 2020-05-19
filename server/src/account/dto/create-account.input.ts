import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType({ description: 'The `CreateAccountInput` input type represents a new account to be created.' })
export class CreateAccountInput {
  @Field()
  @IsNotEmpty()
  readonly displayName: string;
}