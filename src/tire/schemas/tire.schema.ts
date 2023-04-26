import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TireManufacturer } from '../../tire_manufacturers/schemas/tire_manufacturer.schema';

@Schema()
export class Tire extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: TireManufacturer, ref: 'TireManufacturerr', required: true })
  manufacturerr: TireManufacturer;
}

export const TireSchema = SchemaFactory.createForClass(Tire);
export type TireDocument = Tire & Document;
