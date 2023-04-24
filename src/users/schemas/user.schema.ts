import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Car } from '../../cars/schemas/car.schema';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop([
    {
      name: { type: String, ref: Car.name },
      modelName: { type: String, ref: Car.name },
    },
  ])
  mycars: Array<{ name: string; modelName: string }>;

  @Prop()
  displacement: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
