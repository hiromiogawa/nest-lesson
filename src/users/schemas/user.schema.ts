import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Car } from '../../cars/schemas/car.schema';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Car.name, default: [] }])
  mycars: Types.ObjectId[];

  @Prop()
  displacement: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
