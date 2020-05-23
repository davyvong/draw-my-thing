import { BadRequestException, Inject, NotFoundException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import get from 'lodash/get';
import { Account } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

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
    return this.roomService.join(player, code);
  }

  @Mutation(() => Room)
  @UseGuards(JwtAuthGuard)
  async startGame(@CurrentAccount() account: Account, @Args('code') code: string): Promise<Room> {
    const room = await this.roomService.findByCode(code);
    if (!room || account.id !== room.createdBy) {
      throw new BadRequestException();
    }
    return this.roomService.startGame(code);
  }

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async sendMessage(@CurrentAccount() account: Account, @Args('code') code: string, @Args('message') text: string): Promise<Message> {
    const player = {
      displayName: account.displayName,
      id: account.id,
    };
    return this.roomService.sendMessage(player, code, text);
  }

  @Mutation(() => Drawing)
  @UseGuards(JwtAuthGuard)
  async sendDrawing(@CurrentAccount() account: Account, @Args('code') code: string, @Args('input') input: DrawingInput): Promise<Drawing> {
    const room = await this.roomService.findByCode(code);
    if (!room) {
      throw new NotFoundException();
    }
    if (room.drawingPlayer !== account.id) {
      throw new UnauthorizedException();
    }
    return this.roomService.sendDrawing(code, input);
  }

  @Subscription(() => Event, {
    filter: (payload, variables, context) => {
      const connectionCode = get(context, 'connection.variables.code');
      const payloadCode = get(payload, 'roomEvents.code');
      return connectionCode && connectionCode === payloadCode;
    },
    resolve: (payload, args, context) => {
      const connectionId = get(context, 'connection.variables.id');
      const payloadDrawerId = get(payload, 'roomEvents.drawingPlayer', connectionId);
      if (connectionId !== payloadDrawerId) {
        payload.secretWord = null;
        return {
          ...payload,
          secretWord: null,
        };
      }
      return payload;
    }
  })
  roomEvents() {
    return this.pubSub.asyncIterator('roomEvents');
  }
}
