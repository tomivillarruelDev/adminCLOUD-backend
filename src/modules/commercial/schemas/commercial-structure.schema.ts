import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class CommercialStructure extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  parentId: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Agency', default: [] })
  agencies: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Agent', default: [] })
  agents: MongooseSchema.Types.ObjectId[];
}

export const CommercialStructureSchema =
  SchemaFactory.createForClass(CommercialStructure);
