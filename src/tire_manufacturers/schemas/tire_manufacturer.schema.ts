import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum TireManufacturers {
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
export class TireManufacturer extends Document {
  @Prop({ required: true, type: String, enum: TireManufacturers, unique: true })
  name: TireManufacturers;
}

export const TireManufacturerSchema =
  SchemaFactory.createForClass(TireManufacturer);
export type TireManufacturerDocument = TireManufacturer & Document;
