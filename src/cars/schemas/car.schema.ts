import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum CarMaker {
  TOYOTA = 'TOYOTA',
  HONDA = 'HONDA',
  MAZDA = 'MAZDA',
  // 他のメーカーも追加できます
}

enum Drivetrain {
  FF = 'FF',
  FR = 'FR',
  WD4 = '4WD',
  MR = 'MR',
  // 他の駆動方式も追加できます
}

@Schema()
export class Car extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  modelName: string;

  @Prop({ type: String, enum: CarMaker })
  maker: CarMaker;

  @Prop({ type: String, enum: Drivetrain })
  drivetrain: Drivetrain;

  @Prop()
  displacement: number;
}

const CarSchema = SchemaFactory.createForClass(Car);
CarSchema.index({ name: 1, modelName: 1 }, { unique: true }); // 複合一意インデックスを追加

export { CarSchema };
export type CarDocument = Car & Document;
