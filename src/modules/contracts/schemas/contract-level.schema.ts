import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ContractLevel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  level: number;
}

export const ContractLevelSchema = SchemaFactory.createForClass(ContractLevel);
