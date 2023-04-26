import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Car } from '../../cars/schemas/car.schema';

@Schema()
export class MyCar extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Car.name, required: true })
  carId: Types.ObjectId;
}

export const MyCarSchema = SchemaFactory.createForClass(MyCar);
export type MyCarDocument = MyCar & Document;
