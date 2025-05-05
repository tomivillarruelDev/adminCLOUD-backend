import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { State } from '../schemas/state.schema';
import { City } from '../schemas/city.schema';
import { CreateCountryDto, UpdateCountryDto } from '../dto/country.dto';
import { CreateStateDto, UpdateStateDto } from '../dto/state.dto';
import { CreateCityDto, UpdateCityDto } from '../dto/city.dto';
import {
  LocationStructureCountry,
  LocationStructureState,
} from '../interfaces/location-structure.interface';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
    @InjectModel(State.name) private readonly stateModel: Model<State>,
    @InjectModel(City.name) private readonly cityModel: Model<City>,
  ) {}

  // PAÍSES
  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    const createdCountry = new this.countryModel(createCountryDto);
    return createdCountry.save();
  }

  async findAllCountries(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findCountryById(id: string): Promise<Country> {
    const country = await this.countryModel.findById(id).exec();
    if (!country) {
      throw new NotFoundException(`País con ID ${id} no encontrado`);
    }
    return country;
  }

  async updateCountry(
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    const updatedCountry = await this.countryModel
      .findByIdAndUpdate(id, updateCountryDto, { new: true })
      .exec();

    if (!updatedCountry) {
      throw new NotFoundException(`País con ID ${id} no encontrado`);
    }

    return updatedCountry;
  }

  async removeCountry(id: string): Promise<Country> {
    const deletedCountry = await this.countryModel.findByIdAndDelete(id).exec();

    if (!deletedCountry) {
      throw new NotFoundException(`País con ID ${id} no encontrado`);
    }

    // Eliminar estados asociados al país
    await this.stateModel.deleteMany({ country: id }).exec();

    return deletedCountry;
  }

  // ESTADOS
  async createState(createStateDto: CreateStateDto): Promise<State> {
    // Verificar que el país existe
    await this.findCountryById(createStateDto.country.toString());

    const createdState = new this.stateModel(createStateDto);
    return createdState.save();
  }

  async findAllStates(): Promise<State[]> {
    return this.stateModel.find().populate('country').exec();
  }

  async findStatesByCountry(countryId: string): Promise<State[]> {
    return this.stateModel.find({ country: countryId }).exec();
  }

  async findStateById(id: string): Promise<State> {
    const state = await this.stateModel.findById(id).populate('country').exec();

    if (!state) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }

    return state;
  }

  async updateState(
    id: string,
    updateStateDto: UpdateStateDto,
  ): Promise<State> {
    // Si se proporciona un país, verificar que existe
    if (updateStateDto.country) {
      await this.findCountryById(updateStateDto.country.toString());
    }

    const updatedState = await this.stateModel
      .findByIdAndUpdate(id, updateStateDto, { new: true })
      .populate('country')
      .exec();

    if (!updatedState) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }

    return updatedState;
  }

  async removeState(id: string): Promise<State> {
    const deletedState = await this.stateModel.findByIdAndDelete(id).exec();

    if (!deletedState) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }

    // Eliminar ciudades asociadas al estado
    await this.cityModel.deleteMany({ state: id }).exec();

    return deletedState;
  }

  // CIUDADES
  async createCity(createCityDto: CreateCityDto): Promise<City> {
    // Verificar que el estado existe
    await this.findStateById(createCityDto.state.toString());

    const createdCity = new this.cityModel(createCityDto);
    return createdCity.save();
  }

  async findAllCities(): Promise<City[]> {
    return this.cityModel
      .find()
      .populate({
        path: 'state',
        populate: {
          path: 'country',
        },
      })
      .exec();
  }

  async findCitiesByState(stateId: string): Promise<City[]> {
    return this.cityModel.find({ state: stateId }).exec();
  }

  async findCityById(id: string): Promise<City> {
    const city = await this.cityModel
      .findById(id)
      .populate({
        path: 'state',
        populate: {
          path: 'country',
        },
      })
      .exec();

    if (!city) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
    }

    return city;
  }

  async updateCity(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    // Si se proporciona un estado, verificar que existe
    if (updateCityDto.state) {
      await this.findStateById(updateCityDto.state.toString());
    }

    const updatedCity = await this.cityModel
      .findByIdAndUpdate(id, updateCityDto, { new: true })
      .populate({
        path: 'state',
        populate: {
          path: 'country',
        },
      })
      .exec();

    if (!updatedCity) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
    }

    return updatedCity;
  }

  async removeCity(id: string): Promise<City> {
    const deletedCity = await this.cityModel.findByIdAndDelete(id).exec();

    if (!deletedCity) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
    }

    return deletedCity;
  }

  // Métodos auxiliares para obtener estructuras anidadas
  async getLocationStructure(): Promise<LocationStructureCountry[]> {
    const countries = await this.countryModel.find().exec();
    const result: LocationStructureCountry[] = [];

    for (const country of countries) {
      const states = await this.stateModel
        .find({ country: country._id })
        .exec();
      const statesList: LocationStructureState[] = [];

      for (const state of states) {
        const cities = await this.cityModel.find({ state: state._id }).exec();
        statesList.push({
          _id: state._id,
          name: state.name,
          code: state.code,
          cities: cities.map((city) => ({
            _id: city._id,
            name: city.name,
            code: city.code,
            postalCodes: city.postalCodes,
          })),
        });
      }

      result.push({
        _id: country._id,
        name: country.name,
        code: country.code,
        flag: country.flag,
        states: statesList,
      });
    }

    return result;
  }
}
