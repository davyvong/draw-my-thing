import { Schema } from 'mongoose';

export const RoomSchema = new Schema({
  chat: [Object],
  code: String,
  createdBy: String,
  createdOn: Number,
  drawing: [Object],
  drawingPlayer: String,
  gameStarted: Boolean,
  players: [Object],
  secretWord: String,
}, { versionKey: false });
