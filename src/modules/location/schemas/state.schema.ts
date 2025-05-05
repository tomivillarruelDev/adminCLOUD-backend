import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Country } from './country.schema';

@Schema({ timestamps: true })
export class State extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Country', required: true })
  country: Country | MongooseSchema.Types.ObjectId;
}

export const StateSchema = SchemaFactory.createForClass(State);
