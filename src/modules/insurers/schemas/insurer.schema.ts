import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Insurer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const InsurerSchema = SchemaFactory.createForClass(Insurer);
