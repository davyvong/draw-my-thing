import { BadRequestException, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import get from 'lodash/get';
import { Account } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

import { LineInput } from './dto/line.input';
import { Event } from './models/event.model';
import { Line } from './models/line.model';
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
      throw new BadRequestException();
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

  @Mutation(() => [Line])
  @UseGuards(JwtAuthGuard)
  async sendDrawing(@CurrentAccount() account: Account, @Args('code') code: string, @Args('input', { type: () => [LineInput] }) lines: LineInput[]): Promise<Line[]> {
    const room = await this.roomService.findByCode(code);
    if (!room || room.drawingPlayer !== account.id) {
      throw new BadRequestException();
    }
    await this.roomService.sendDrawing(code, lines);
    this.pubSub.publish('roomEvents', {
      roomEvents: {
        code,
        data: lines,
        type: 'drawing',
      },
    });
    return lines;
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
