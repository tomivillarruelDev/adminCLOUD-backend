import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Contract extends Document {
  @Prop({ required: true })
  contractNumber: string;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  amount: number;

  @Prop()
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company', required: true })
  companyId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ContractLevel',
    required: true,
  })
  contractLevelId: MongooseSchema.Types.ObjectId;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
