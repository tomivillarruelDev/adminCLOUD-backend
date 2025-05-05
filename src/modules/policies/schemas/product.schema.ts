import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  stock: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Insurer', required: true })
  insurerId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'AdditionalCoverage',
    default: [],
  })
  additionalCoverageIds: MongooseSchema.Types.ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
