import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { Account } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

import { Event } from './models/event.model';
import { Room } from './models/room.model';
import { RoomService } from './room.service';

@Resolver()
export class RoomResolver {
  constructor(@Inject('PubSub') private readonly pubSub: PubSubEngine, private readonly roomService: RoomService) { }

  @Mutation(() => Room)
  @UseGuards(JwtAuthGuard)
  async createRoom(@CurrentAccount() account: Account): Promise<Room> {
    return this.roomService.create(account);
  }

  @Query(() => Room)
  @UseGuards(JwtAuthGuard)
  async findRoom(@Args('code') code: string): Promise<Room> {
    return this.roomService.findByCode(code);
  }

  @Mutation(() => Room)
  @UseGuards(JwtAuthGuard)
  async joinRoom(@CurrentAccount() account: Account, @Args('code') code: string): Promise<Room> {
    const player = {
      displayName: account.displayName,
      id: account.id,
    };
    const room = await this.roomService.join(player, code);
    await this.pubSub.publish('roomEvents', {
      roomEvents: {
        code: room.code,
        data: player,
        type: 'joinedRoom',
      },
    });
    return room;
  }

  @Subscription(() => Event)
  roomEvents() {
    return this.pubSub.asyncIterator('roomEvents');
  }
}
