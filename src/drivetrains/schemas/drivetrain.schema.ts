import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Drivetrain {
  FF = 'FF',
  FR = 'FR',
  WD4 = '4WD',
  MR = 'MR',
  // 他の駆動方式も追加できます
}

@Schema()
export class DriveTrain extends Document {
  @Prop({ required: true, type: String, enum: Drivetrain, unique: true })
  system: Drivetrain;
}

export const DriveTrainSchema = SchemaFactory.createForClass(DriveTrain);
export type DriveTrainDocument = DriveTrain & Document;
