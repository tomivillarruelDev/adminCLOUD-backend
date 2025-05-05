import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSeeder } from './location.seeder';
import { SeederService } from './seeder.service';
import { City, CitySchema } from '../modules/location/schemas/city.schema';
import {
  Country,
  CountrySchema,
} from '../modules/location/schemas/country.schema';
import { State, StateSchema } from '../modules/location/schemas/state.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Country.name, schema: CountrySchema },
      { name: State.name, schema: StateSchema },
      { name: City.name, schema: CitySchema },
    ]),
  ],
  providers: [LocationSeeder, SeederService],
  exports: [SeederService],
})
export class SeederModule {}
