import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum CarMaker {
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
export class Maker extends Document {
  @Prop({ required: true, type: String, enum: CarMaker, unique: true })
  name: CarMaker;
}

export const MakerSchema = SchemaFactory.createForClass(Maker);
export type MakerDocument = Maker & Document;
