import { Schema, Document } from 'mongoose';

export interface User {
  username: string;
  password: string;
  email: string;
}

export interface UserDocument extends User, Document {}

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    // 同じ名前のユーザーを登録できない
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
});
