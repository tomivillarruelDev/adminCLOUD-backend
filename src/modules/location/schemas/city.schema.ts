import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { State } from './state.schema';

@Schema({ timestamps: true })
export class City extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  code?: string;

  @Prop()
  postalCodes?: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'State', required: true })
  state: State | MongooseSchema.Types.ObjectId;
}

export const CitySchema = SchemaFactory.createForClass(City);
