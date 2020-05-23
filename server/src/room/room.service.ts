import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchedulerRegistry } from '@nestjs/schedule';
import sha256 from 'crypto-js/sha256';
import { PubSubEngine } from 'graphql-subscriptions';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { Drawing } from './models/drawing.model';
import { Message } from './models/message.model';
import { Player } from './models/player.model';
import { Room } from './models/room.model';

@Injectable()
export class RoomService {
  constructor(
    @Inject('PubSub') private readonly pubSub: PubSubEngine,
    @InjectModel('Room') private readonly roomModel,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async create(player: Player): Promise<Room> {
    const room = {
      chat: [],
      code: await this.generateRoomCode(),
      createdBy: player.id,
      createdOn: moment().unix(),
      drawing: [],
      gameStarted: false,
      players: [{
        displayName: player.displayName,
        id: player.id,
      }],
    };
    return this.roomModel.create(room);
  }

  async findByCode(code: string): Promise<Room> {
    return this.roomModel.findOne({ code });
  }

  async findById(id: string): Promise<Room> {
    return this.roomModel.findById(id);
  }

  async generateRoomCode(): Promise<string> {
    const uniqueMessage = String(moment().unix());
    const code = sha256(uniqueMessage).toString().substring(0, 5).toUpperCase();
    if (await this.findByCode(code)) {
      return this.generateRoomCode();
    }
    return code;
  }

  async join(player: Player, code: string): Promise<Room> {
    let room = await this.findByCode(code);
    if (!room) {
      throw new NotFoundException();
    }
    const index = room.players.findIndex(p => p.id === player.id);
    if (index > -1) {
      const playerData = room.players[index];
      if (playerData.displayName) {
        this.sendSystemMessage(code, `${player.displayName} has re-joined the room.`);
        return room;
      }
    }
    room = await this.roomModel.findOneAndUpdate({ code }, {
      $addToSet: {
        players: {
          displayName: player.displayName,
          id: player.id,
        }
      }
    }, { new: true });
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
    if (player.displayName) {
      this.sendSystemMessage(code, `${player.displayName} has joined the room.`);
    }
    return room;
  }

  async startGame(code: string): Promise<Room> {
    let room = await this.findByCode(code);
    if (!room) {
      throw new NotFoundException();
    }
    const drawingPlayer = room.players[0];
    const startTime = moment().unix();
    const nextRoundTimeout = setTimeout(() => this.startNextRound(code), 60);
    this.schedulerRegistry.addTimeout(`room.${code}.nextRound`, nextRoundTimeout);
    const update = {
      drawing: [],
      drawingPlayer: drawingPlayer.id,
      drawingPlayerCursor: 0,
      gameStarted: true,
      roundStartTime: startTime,
      roundEndTime: startTime + 60,
      secretWord: 'dog',
    };
    room = this.roomModel.findOneAndUpdate({ code }, update, { new: true });
    this.pubSub.publish('roomEvents', {
      roomEvents: {
        code,
        data: update,
        type: 'gameStart',
      },
    });
    this.sendSystemMessage(code, `${drawingPlayer.displayName} is drawing.`);
    return await room;
  }

  async startNextRound(code: string): Promise<void> {
    console.log(moment().toISOString(), code);
    const room = await this.findByCode(code);
    if (!room) {
      throw new NotFoundException();
    }
    const drawingPlayerCursor = room.drawingPlayerCursor < room.players.length - 1 ? room.drawingPlayerCursor + 1 : 0;
    const drawingPlayer = room.players[drawingPlayerCursor];
    const startTime = moment().unix();
    const update = {
      drawing: [],
      drawingPlayer: drawingPlayer.id,
      drawingPlayerCursor,
      roundStartTime: startTime,
      roundEndTime: startTime + 60,
      secretWord: 'dog',
    };
    this.roomModel.findOneAndUpdate({ code }, update, { new: true });
    this.pubSub.publish('roomEvents', {
      roomEvents: {
        code,
        data: update,
        type: 'roundStart',
      },
    });
    this.sendSystemMessage(code, `${drawingPlayer.displayName} is drawing.`);
    const nextRoundTimeout = setTimeout(() => this.startNextRound(code), 60);
    this.schedulerRegistry.addTimeout(`room.${code}.nextRound`, nextRoundTimeout);
  }

  async sendSystemMessage(code: string, text: string): Promise<Message> {
    const message = {
      id: uuidv4(),
      timestamp: moment().unix(),
      text,
      type: 'system',
    };
    if (await this.roomModel.findOneAndUpdate({ code }, { $push: { chat: message } })) {
      this.pubSub.publish('roomEvents', {
        roomEvents: {
          code,
          data: message,
          type: 'system',
        },
      });
    }
    return message;
  }

  async sendMessage(player: Player, code: string, text: string): Promise<Message> {
    const message = {
      id: uuidv4(),
      sender: player.id,
      timestamp: moment().unix(),
      text,
      type: 'player',
    };
    const room = await this.roomModel.findOneAndUpdate({ code }, { $push: { chat: message } }, { new: true });
    if (!room) {
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

  async sendDrawing(code: string, drawing: Drawing): Promise<Drawing> {
    const room = await this.roomModel.findOneAndUpdate({ code }, { $push: { drawing } }, { new: true });
    if (!room) {
      return null
    }
    this.pubSub.publish('roomEvents', {
      roomEvents: {
        code,
        data: drawing,
        type: 'drawing',
      },
    });
    return drawing;
  }
}