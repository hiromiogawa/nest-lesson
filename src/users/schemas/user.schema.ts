import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
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
});
