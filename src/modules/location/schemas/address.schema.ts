import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { State } from '../schemas/state.schema';
import { City } from '../schemas/city.schema';

@Schema({ _id: false })
export class Address {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Country', required: true })
  country: Country | MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'State', required: true })
  state: State | MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'City', required: true })
  city: City | MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  mainStreet: string;

  @Prop()
  secondaryStreet?: string;

  @Prop()
  number?: string;

  @Prop()
  postalCode?: string;

  @Prop()
  floor?: string;

  @Prop()
  apartment?: string;

  @Prop()
  building?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
