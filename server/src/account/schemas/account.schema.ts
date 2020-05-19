import { Schema } from 'mongoose';

export const AccountSchema = new Schema({
  createdOn: Number,
  displayName: String,
  ip: String,
}, { versionKey: false });
