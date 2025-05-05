import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { CreateCountryDto, UpdateCountryDto } from '../dto/country.dto';
import { CreateStateDto, UpdateStateDto } from '../dto/state.dto';
import { CreateCityDto, UpdateCityDto } from '../dto/city.dto';
import { LocationStructureCountry } from '../interfaces/location-structure.interface';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // PAÍSES
  @Post('countries')
  createCountry(@Body() createCountryDto: CreateCountryDto) {
    return this.locationService.createCountry(createCountryDto);
  }

  @Get('countries')
  findAllCountries() {
    return this.locationService.findAllCountries();
  }

  @Get('countries/:id')
  findCountryById(@Param('id') id: string) {
    return this.locationService.findCountryById(id);
  }

  @Put('countries/:id')
  updateCountry(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.locationService.updateCountry(id, updateCountryDto);
  }

  @Delete('countries/:id')
  removeCountry(@Param('id') id: string) {
    return this.locationService.removeCountry(id);
  }

  // ESTADOS
  @Post('states')
  createState(@Body() createStateDto: CreateStateDto) {
    return this.locationService.createState(createStateDto);
  }

  @Get('states')
  findAllStates(@Query('countryId') countryId?: string) {
    if (countryId) {
      return this.locationService.findStatesByCountry(countryId);
    }
    return this.locationService.findAllStates();
  }

  @Get('states/:id')
  findStateById(@Param('id') id: string) {
    return this.locationService.findStateById(id);
  }

  @Put('states/:id')
  updateState(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.locationService.updateState(id, updateStateDto);
  }

  @Delete('states/:id')
  removeState(@Param('id') id: string) {
    return this.locationService.removeState(id);
  }

  // CIUDADES
  @Post('cities')
  createCity(@Body() createCityDto: CreateCityDto) {
    return this.locationService.createCity(createCityDto);
  }

  @Get('cities')
  findAllCities(@Query('stateId') stateId?: string) {
    if (stateId) {
      return this.locationService.findCitiesByState(stateId);
    }
    return this.locationService.findAllCities();
  }

  @Get('cities/:id')
  findCityById(@Param('id') id: string) {
    return this.locationService.findCityById(id);
  }

  @Put('cities/:id')
  updateCity(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.locationService.updateCity(id, updateCityDto);
  }

  @Delete('cities/:id')
  removeCity(@Param('id') id: string) {
    return this.locationService.removeCity(id);
  }

  // ESTRUCTURA COMPLETA
  @Get('structure')
  getLocationStructure(): Promise<LocationStructureCountry[]> {
    return this.locationService.getLocationStructure();
  }
}
