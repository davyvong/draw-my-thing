import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import sha256 from 'crypto-js/sha256';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { Drawing } from './models/drawing.model';
import { Message } from './models/message.model';
import { Player } from './models/player.model';
import { Room } from './models/room.model';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private readonly roomModel) { }

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
    return this.roomModel.findOneAndUpdate({ code }, {
      $addToSet: {
        players: {
          displayName: player.displayName,
          id: player.id,
        }
      }
    }, { new: true });
  }

  async sendSystemMessage(code: string, text: string): Promise<Message> {
    const message = {
      id: uuidv4(),
      timestamp: moment().unix(),
      text,
      type: 'system',
    };
    await this.roomModel.findOneAndUpdate({ code }, { $push: { chat: message } }, { new: true });
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
    await this.roomModel.findOneAndUpdate({ code }, { $push: { chat: message } }, { new: true });
    return message;
  }

  async sendDrawing(code: string, drawing: Drawing): Promise<Drawing> {
    const room = await this.roomModel.findOneAndUpdate({ code }, { $push: { drawing } }, { new: true });
    if (room) {
      return drawing;
    }
    return null;
  }
}