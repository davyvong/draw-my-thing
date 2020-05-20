import { Schema } from 'mongoose';

export const RoomSchema = new Schema({
  chat: [Object],
  code: String,
  createdBy: String,
  createdOn: Number,
  players: [Object]
}, { versionKey: false });
