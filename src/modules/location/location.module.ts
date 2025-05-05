import { Module } from '@nestjs/common';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { State, StateSchema } from './schemas/state.schema';
import { City, CitySchema } from './schemas/city.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Country.name, schema: CountrySchema },
      { name: State.name, schema: StateSchema },
      { name: City.name, schema: CitySchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
