import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType({ description: 'The `UpdateAccountInput` input type represents updated data for an existing account.' })
export class UpdateAccountInput {  
  @Field({ nullable: true })
  @IsOptional()
  readonly displayName: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly strokeColor?: string

  @Field({ nullable: true })
  @IsOptional()
  readonly strokeWidth?: number
}