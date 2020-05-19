import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType({ description: 'The `CreateAccountInput` input type represents a new account to be created.' })
export class CreateAccountInput {
  @Field({ nullable: true })
  @IsOptional()
  readonly displayName: string;
}