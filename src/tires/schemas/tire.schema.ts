import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TireManufacturer } from '../../tire_manufacturers/schemas/tire_manufacturer.schema';

@Schema()
export class Tire extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: TireManufacturer.name, required: true })
  manufacturer: Types.ObjectId;
}

export const TireSchema = SchemaFactory.createForClass(Tire);
export type TireDocument = Tire & Document;
