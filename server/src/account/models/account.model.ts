import { ObjectType } from '@nestjs/graphql';
import { Player } from 'src/room/models/player.model';

@ObjectType({ description: 'The `Account` object type represents an account.' })
export class Account extends Player {
  createdOn?: number

  ip?: string
}