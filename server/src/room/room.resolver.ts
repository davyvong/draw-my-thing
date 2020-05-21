import { Inject, UseGuards, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import get from 'lodash/get';
import { Account } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

import { Event } from './models/event.model';
import { Message } from './models/message.model';
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
    const room = await this.roomService.findByCode(code);
    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }

  @Mutation(() => Room)
  @UseGuards(JwtAuthGuard)
  async joinRoom(@CurrentAccount() account: Account, @Args('code') code: string): Promise<Room> {
    const player = {
      displayName: account.displayName,
      id: account.id,
    };
    const room = await this.roomService.join(player, code);
    if (!room) {
      throw new NotFoundException();
    }
    this.pubSub.publish('roomEvents', {
      roomEvents: {
        code,
        data: player,
        type: 'joinedRoom',
      },
    });
    return room;
  }

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async sendMessage(@CurrentAccount() account: Account, @Args('code') code: string, @Args('message') text: string): Promise<Message> {
    const player = {
      displayName: account.displayName,
      id: account.id,
    };
    const message = await this.roomService.sendMessage(player, code, text);
    if (!message) {
      throw new NotFoundException();
    }
    this.pubSub.publish('roomEvents', {
      roomEvents: {
        code,
        data: message,
        type: 'message',
      },
    });
    return message;
  }

  @Subscription(() => Event, {
    filter: (payload, variables, context) => {
      const connectionCode = get(context, 'connection.variables.code');
      const payloadCode = get(payload, 'roomEvents.code');
      return connectionCode && connectionCode === payloadCode;
    },
  })
  roomEvents() {
    return this.pubSub.asyncIterator('roomEvents');
  }
}
