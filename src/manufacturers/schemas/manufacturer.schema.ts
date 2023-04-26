import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum CarManufacturer {
  TOYOTA = 'TOYOTA',
  HONDA = 'HONDA',
  MAZDA = 'MAZDA',
  NISSAN = 'NISSAN',
  SUBARU = 'SUBARU',
  MITSUBISHI = 'MITSUBISHI',
  SUZUKI = 'SUZUKI',
  LEXUS = 'LEXUS',
  // 他のメーカーも追加できます
}

@Schema()
export class Manufacturer extends Document {
  @Prop({ required: true, type: String, enum: CarManufacturer, unique: true })
  name: CarManufacturer;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
export type ManufacturerDocument = Manufacturer & Document;
