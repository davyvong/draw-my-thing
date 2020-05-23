import { Schema } from 'mongoose';

export const RoomSchema = new Schema({
  chat: [Object],
  code: String,
  createdBy: String,
  createdOn: Number,
  drawing: [Object],
  drawingPlayer: String,
  drawingPlayerCursor: Number,
  gameStarted: Boolean,
  players: [Object],
  roundEndTime: Number,
  roundStartTime: Number,
  secretWord: String,
}, { versionKey: false });
