import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Policy extends Document {
  @Prop({ required: true })
  policyNumber: string;

  @Prop({ required: true })
  insuredName: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  premium: number;

  @Prop()
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Person', required: true })
  personId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Insurer', required: true })
  insurerId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Plan', required: true })
  planId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PolicyStatus',
    required: true,
  })
  policyStatusId: MongooseSchema.Types.ObjectId;
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
