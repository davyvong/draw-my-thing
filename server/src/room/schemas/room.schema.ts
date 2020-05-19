import { Schema } from 'mongoose';

export const RoomSchema = new Schema({
  chat: [{ type: Object }],
  code: String,
  createdBy: String,
  createdOn: Number,
  players: [{ type: String }]
}, { versionKey: false });
