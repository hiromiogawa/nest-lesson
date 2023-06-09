// tuning.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { MyCar } from '../../mycar/schemas/mycar.schema';

@Schema()
export class Tuning extends Document {
  @Prop({ require: true, type: SchemaTypes.ObjectId, ref: MyCar.name })
  mycarId: Types.ObjectId;

  @Prop()
  freeText: string;
}

export const TuningSchema = SchemaFactory.createForClass(Tuning);
export type TuningDocument = Tuning & Document;
