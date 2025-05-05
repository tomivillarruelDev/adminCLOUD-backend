import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import csc, { ICountry, IState, ICity } from 'countries-states-cities';
import { Country } from '../modules/location/schemas/country.schema';
import { State } from '../modules/location/schemas/state.schema';
import { City } from '../modules/location/schemas/city.schema';

@Injectable()
export class LocationSeeder {
  private readonly logger = new Logger(LocationSeeder.name);

  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
    @InjectModel(State.name) private readonly stateModel: Model<State>,
    @InjectModel(City.name) private readonly cityModel: Model<City>,
  ) {}

  async seed() {
    this.logger.log('Iniciando la carga de datos de localización...');

    // Eliminar datos existentes
    await this.clearData();

    // Cargar países
    const countries = await this.seedCountries();

    // Cargar estados
    const states = await this.seedStates(countries);

    // Cargar ciudades
    await this.seedCities(states);

    this.logger.log('Carga de datos de localización completada con éxito.');
  }

  async clearData() {
    this.logger.log('Eliminando datos existentes...');
    await this.cityModel.deleteMany({}).exec();
    await this.stateModel.deleteMany({}).exec();
    await this.countryModel.deleteMany({}).exec();
    this.logger.log('Datos existentes eliminados.');
  }

  async seedCountries(): Promise<Map<string, string>> {
    this.logger.log('Cargando países...');
    const countryMap = new Map<string, string>();
    const countries = csc.getAllCountries();

    for (const country of countries) {
      const newCountry = new this.countryModel({
        name: country.name,
        code: country.iso2,
        // La versión actual podría no tener la propiedad flag
        flag: '',
      });

      const savedCountry = await newCountry.save();
      if (savedCountry._id) {
        countryMap.set(country.iso2, savedCountry._id.toString());
      }
    }

    this.logger.log(`${countryMap.size} países cargados.`);
    return countryMap;
  }

  async seedStates(
    countryMap: Map<string, string>,
  ): Promise<Map<string, string>> {
    this.logger.log('Cargando estados/provincias...');
    const stateMap = new Map<string, string>();
    const countries = csc.getAllCountries();

    for (const country of countries) {
      const countryId = countryMap.get(country.iso2);
      if (countryId) {
        // Obtenemos los estados para este país
        const states = csc.getStatesOfCountry(country.id);

        for (const state of states) {
          // Aseguramos que todos los estados tengan un código
          // Si no tiene state_code, generamos uno basado en el nombre
          const stateCode =
            state.state_code || this.generateStateCode(state.name);

          const newState = new this.stateModel({
            name: state.name,
            code: stateCode,
            country: countryId,
          });

          const savedState = await newState.save();
          if (savedState._id) {
            // Guardamos una clave compuesta con countryCode-stateCode para identificar estados únicos
            const stateKey = `${country.iso2}-${stateCode}`;
            stateMap.set(stateKey, savedState._id.toString());
          }
        }
      }
    }

    this.logger.log(`${stateMap.size} estados/provincias cargados.`);
    return stateMap;
  }

  async seedCities(stateMap: Map<string, string>) {
    this.logger.log('Cargando ciudades...');
    let citiesCount = 0;
    const countries = csc.getAllCountries();

    // Para cada país, obtenemos sus estados
    for (const country of countries) {
      const states = csc.getStatesOfCountry(country.id);

      // Para cada estado, obtenemos sus ciudades
      for (const state of states) {
        // Aseguramos que usamos el mismo código para buscar el estado
        const stateCode =
          state.state_code || this.generateStateCode(state.name);
        const stateKey = `${country.iso2}-${stateCode}`;
        const stateId = stateMap.get(stateKey);

        if (stateId) {
          const cities = csc.getCitiesOfState(state.id);

          // Procesamos las ciudades en lotes
          const batchSize = 1000;

          for (let i = 0; i < cities.length; i += batchSize) {
            const batch = cities.slice(i, i + batchSize);
            const cityBatch: { name: string; state: string }[] = [];

            for (const city of batch) {
              cityBatch.push({
                name: city.name,
                state: stateId,
              });
            }

            if (cityBatch.length > 0) {
              await this.cityModel.insertMany(cityBatch);
              citiesCount += cityBatch.length;
              this.logger.log(`Procesadas ${citiesCount} ciudades...`);
            }
          }
        }
      }
    }

    this.logger.log(`${citiesCount} ciudades cargadas.`);
  }

  // Método para generar un código de estado a partir del nombre
  private generateStateCode(stateName: string): string {
    if (!stateName) return 'UN'; // Unknown

    // Eliminar caracteres especiales y convertir a mayúsculas
    const cleanName = stateName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if (cleanName.length === 0) return 'UN';

    // Tomar las primeras 2 letras, o si es más corto, rellenar con 'X'
    return cleanName.substring(0, 2).padEnd(2, 'X');
  }
}
