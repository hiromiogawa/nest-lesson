import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum TireManufactures {
  BRIDGESTONE = 'BRIDGESTONE',
  DUNLOP = 'DUNLOP',
  YOKOHAMA = 'YOKOHAMA',
  TOYOTIRE = 'TOYOTIRE',
  GOODYEAR = 'GOODYEAR',
  Continental = 'Continental',
  HANKOOK = 'HANKOOK',
  MICHELIN = 'MICHELIN',
  // 他のメーカーも追加できます
}

@Schema()
export class TireManufacture extends Document {
  @Prop({ required: true, type: String, enum: TireManufactures, unique: true })
  name: TireManufactures;
}

export const TireManufactureSchema =
  SchemaFactory.createForClass(TireManufacture);
export type TireManufactureDocument = TireManufacture & Document;
