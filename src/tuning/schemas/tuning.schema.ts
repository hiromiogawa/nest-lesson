// tuning.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { MyCar } from '../../mycar/schemas/mycar.schema';

@Schema()
export class Tuning extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: MyCar.name })
  mycarId: MyCar;

  @Prop()
  modification: string;

  @Prop()
  partName: string;

  @Prop()
  effect: string;
}

export const TuningSchema = SchemaFactory.createForClass(Tuning);
export type TuningDocument = Tuning & Document;
