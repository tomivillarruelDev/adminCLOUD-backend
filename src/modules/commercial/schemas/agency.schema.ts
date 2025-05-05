import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Agency extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company' })
  companyId: MongooseSchema.Types.ObjectId;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
