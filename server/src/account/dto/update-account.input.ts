import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType({ description: 'The `UpdateAccountInput` input type represents updated data for an existing account.' })
export class UpdateAccountInput {
  @Field()
  @IsOptional()
  readonly displayName: string;
}