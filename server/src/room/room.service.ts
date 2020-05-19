import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import sha256 from 'crypto-js/sha256';
import moment from 'moment';

import { Room } from './models/room.model';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private readonly roomModel) {}

  async create(accountId: string): Promise<Room> {
    const room = {
      chat: [],
      code: await this.generateRoomCode(),
      createdBy: accountId,
      createdOn: moment().unix(),
      players: [accountId],
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

  async join(accountId: string, code: string): Promise<Room> {
    return this.roomModel.findOneAndUpdate({ code }, { $addToSet: { players: accountId } }, { new: true });
  }
}