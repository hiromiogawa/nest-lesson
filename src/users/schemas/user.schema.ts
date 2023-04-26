import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, unique: true, select: false })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
