import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum CarManufacture {
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
export class Manufacture extends Document {
  @Prop({ required: true, type: String, enum: CarManufacture, unique: true })
  name: CarManufacture;
}

export const ManufactureSchema = SchemaFactory.createForClass(Manufacture);
export type ManufactureDocument = Manufacture & Document;
