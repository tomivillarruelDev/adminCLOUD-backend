import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Types } from 'mongoose';

import { Person } from '../common/schemas/person.schema';
import { RealPersonSchema } from '../real-person/schemas/real-person.schema';
import { LegalPersonSchema } from '../legal-person/schemas/legal-person.schema';
import { CreatePersonDto } from '../dto/create-person.dto';
import { CreateRealPersonDto } from '../real-person/dto/create-real-person.dto';
import { CreateLegalPersonDto } from '../legal-person/dto/create-legal-person.dto';
import { UpdateRealPersonDto } from '../real-person/dto/update-real-person.dto';
import { UpdateLegalPersonDto } from '../legal-person/dto/update-legal-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<Person>,
    @InjectConnection() private connection: Connection,
  ) {}

  // Método privado para validar ObjectId
  private validateObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de persona inválido');
    }
  }

  // Método privado para obtener persona o lanzar excepción
  private async getPersonOrThrow(id: string): Promise<Person> {
    this.validateObjectId(id);
    const person = await this.personModel.findById(id).exec();
    if (!person) throw new NotFoundException('Persona no encontrada');
    return person;
  }

  // Método privado para obtener el modelo discriminador
  private getDiscriminatorModel(type: string): Model<Person> {
    if (type === 'real') {
      return this.personModel.discriminator(
        'real',
        RealPersonSchema,
      ) as Model<Person>;
    } else if (type === 'legal') {
      return this.personModel.discriminator(
        'legal',
        LegalPersonSchema,
      ) as Model<Person>;
    } else {
      throw new BadRequestException('Tipo de persona no soportado');
    }
  }

  async create(
    createPersonDto:
      | CreatePersonDto
      | CreateRealPersonDto
      | CreateLegalPersonDto,
  ): Promise<Person> {
    const { type } = createPersonDto as any;
    const Model = this.getDiscriminatorModel(type);
    return new Model(createPersonDto).save();
  }

  async findAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }

  async findOne(id: string): Promise<Person> {
    return this.getPersonOrThrow(id);
  }

  async update(
    id: string,
    updatePersonDto: UpdateRealPersonDto | UpdateLegalPersonDto,
  ): Promise<Person> {
    const person = await this.getPersonOrThrow(id);
    const Model = this.getDiscriminatorModel(person.type);
    const updated = await Model.findByIdAndUpdate(id, updatePersonDto, {
      new: true,
    }).exec();
    if (!updated) {
      throw new NotFoundException('No se pudo actualizar la persona');
    }
    return updated;
  }

  async remove(id: string): Promise<Person> {
    this.validateObjectId(id);
    const deleted = await this.personModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Persona no encontrada');
    return deleted;
  }
}
