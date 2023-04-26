// setting.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tire } from '../../tires/schemas/tire.schema';
import { MyCar } from '../../mycar/schemas/mycar.schema';

@Schema()
export class Setting extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: MyCar.name })
  mycarId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: Tire.name })
  tireId: Types.ObjectId;

  @Prop()
  freeText: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
export type SettingDocument = Setting & Document;
