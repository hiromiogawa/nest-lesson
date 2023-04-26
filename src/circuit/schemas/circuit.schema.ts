import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Circuit extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  layoutImageUrl: string;
}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);
export type CircuitDocument = Circuit & Document;
