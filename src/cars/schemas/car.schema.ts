import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Manufacturer } from '../../manufacturers/schemas/manufacturer.schema';
import { DriveTrain } from '../../drivetrains/schemas/drivetrain.schema';

@Schema()
export class Car extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  modelName: string;

  @Prop({ type: String, ref: Manufacturer.name, required: true })
  Manufacturer: string;

  @Prop({ type: String, ref: DriveTrain.name, required: true })
  drivetrains: string;

  @Prop({ required: true })
  displacement: number;
}

const CarSchema = SchemaFactory.createForClass(Car);
CarSchema.index({ name: 1, modelName: 1 }, { unique: true }); // 複合一意インデックスを追加

export { CarSchema };
export type CarDocument = Car & Document;
