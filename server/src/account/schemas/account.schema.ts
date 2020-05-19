import { Schema } from 'mongoose';

export const AccountSchema = new Schema({
  displayName: String,
}, { versionKey: false });
