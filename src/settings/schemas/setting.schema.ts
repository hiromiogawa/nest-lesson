import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Setting extends Document {
  @Prop({ required: true })
  tuningId: string;

  @Prop({ required: true })
  tireId: string;

  @Prop()
  freeText: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
export type SettingDocument = Setting & Document;
