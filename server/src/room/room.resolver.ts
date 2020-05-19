import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

import { Room } from './models/room.model';
import { RoomService } from './room.service';

@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Mutation(() => Room)
  @UseGuards(JwtAuthGuard)
  async createRoom(@CurrentAccount() account: Account): Promise<Room> {
    return this.roomService.create(account.id);
  }

  @Query(() => Room)
  @UseGuards(JwtAuthGuard)
  async findRoom(@Args('code') code: string): Promise<Room> {
    return this.roomService.findByCode(code);
  }

  @Mutation(() => Room)
  @UseGuards(JwtAuthGuard)
  async joinRoom(@CurrentAccount() account: Account, @Args('code') code: string): Promise<Room> {
    return this.roomService.join(account.id, code);
  }
}
