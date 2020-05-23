import { BadRequestException, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import get from 'lodash/get';
import moment from 'moment'
import { Account } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { v4 as uuidv4 } from 'uuid';

import { DrawingInput } from './dto/drawing.input';
import { Drawing } from './models/drawing.model';
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
    if (account.displayName) {
      const systemMessage = await this.roomService.sendSystemMessage(code, `${account.displayName} has joined the room.`);
      this.pubSub.publish('roomEvents', {
        roomEvents: {
          code,
          data: systemMessage,
          type: 'message',
        },
      });
    }
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

  @Mutation(() => Drawing)
  @UseGuards(JwtAuthGuard)
  async sendDrawing(@CurrentAccount() account: Account, @Args('code') code: string, @Args('input') input: DrawingInput): Promise<Drawing> {
    const room = await this.roomService.findByCode(code);
    if (!room || room.drawingPlayer !== account.id) {
      throw new BadRequestException();
    }
    await this.roomService.sendDrawing(code, input);
    this.pubSub.publish('roomEvents', {
      roomEvents: {
        code,
        data: input,
        type: 'drawing',
      },
    });
    return input;
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
