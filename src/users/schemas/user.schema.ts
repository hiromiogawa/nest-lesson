import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Car } from '../../cars/schemas/car.schema';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop([{ type: { type: SchemaTypes.ObjectId, ref: Car.name } }])
  mycars: Car[];

  @Prop()
  displacement: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
