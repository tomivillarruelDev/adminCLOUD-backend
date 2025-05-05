import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LegalPerson } from '../schemas/legal-person.schema';
import { CreateLegalPersonDto } from '../dto/create-legal-person.dto';
import { UpdateLegalPersonDto } from '../dto/update-legal-person.dto';

/**
 * Servicio específico para la gestión de personas jurídicas
 */
@Injectable()
export class LegalPersonService {
  constructor(
    @InjectModel(LegalPerson.name)
    private readonly legalPersonModel: Model<LegalPerson>,
  ) {}

  /**
   * Crea una nueva persona jurídica
   */
  async create(
    createLegalPersonDto: CreateLegalPersonDto,
  ): Promise<LegalPerson> {
    const existingPerson = await this.legalPersonModel.findOne({
      email: createLegalPersonDto.email,
    });

    if (existingPerson) {
      throw new BadRequestException(
        `Ya existe una persona jurídica con el email ${createLegalPersonDto.email}`,
      );
    }

    const createdPerson = new this.legalPersonModel(createLegalPersonDto);
    return createdPerson.save();
  }

  /**
   * Obtiene todas las personas jurídicas
   */
  async findAll(): Promise<LegalPerson[]> {
    return this.legalPersonModel.find().exec();
  }

  /**
   * Obtiene una persona jurídica por su ID
   */
  async findOne(id: string): Promise<LegalPerson> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de persona jurídica inválido');
    }

    const person = await this.legalPersonModel.findById(id).exec();

    if (!person) {
      throw new NotFoundException(
        `Persona jurídica con ID ${id} no encontrada`,
      );
    }

    return person;
  }

  /**
   * Actualiza una persona jurídica
   */
  async update(
    id: string,
    updateLegalPersonDto: UpdateLegalPersonDto,
  ): Promise<LegalPerson> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de persona jurídica inválido');
    }

    const updatedPerson = await this.legalPersonModel
      .findByIdAndUpdate(id, updateLegalPersonDto, { new: true })
      .exec();

    if (!updatedPerson) {
      throw new NotFoundException(
        `Persona jurídica con ID ${id} no encontrada`,
      );
    }

    return updatedPerson;
  }

  /**
   * Elimina una persona jurídica
   */
  async remove(id: string): Promise<LegalPerson> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de persona jurídica inválido');
    }

    const deletedPerson = await this.legalPersonModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedPerson) {
      throw new NotFoundException(
        `Persona jurídica con ID ${id} no encontrada`,
      );
    }

    return deletedPerson;
  }
}
