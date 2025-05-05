import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RealPerson } from '../schemas/real-person.schema';
import { CreateRealPersonDto } from '../dto/create-real-person.dto';
import { UpdateRealPersonDto } from '../dto/update-real-person.dto';

/**
 * Servicio específico para la gestión de personas físicas
 */
@Injectable()
export class RealPersonService {
  constructor(
    @InjectModel(RealPerson.name)
    private readonly realPersonModel: Model<RealPerson>,
  ) {}

  /**
   * Crea una nueva persona física
   */
  async create(createRealPersonDto: CreateRealPersonDto): Promise<RealPerson> {
    const existingPerson = await this.realPersonModel.findOne({
      email: createRealPersonDto.email,
    });

    if (existingPerson) {
      throw new BadRequestException(
        `Ya existe una persona con el email ${createRealPersonDto.email}`,
      );
    }

    const createdPerson = new this.realPersonModel(createRealPersonDto);
    return createdPerson.save();
  }

  /**
   * Obtiene todas las personas físicas
   */
  async findAll(): Promise<RealPerson[]> {
    return this.realPersonModel.find().exec();
  }

  /**
   * Obtiene una persona física por su ID
   */
  async findOne(id: string): Promise<RealPerson> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de persona inválido');
    }

    const person = await this.realPersonModel.findById(id).exec();

    if (!person) {
      throw new NotFoundException(`Persona física con ID ${id} no encontrada`);
    }

    return person;
  }

  /**
   * Actualiza una persona física
   */
  async update(
    id: string,
    updateRealPersonDto: UpdateRealPersonDto,
  ): Promise<RealPerson> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de persona inválido');
    }

    const updatedPerson = await this.realPersonModel
      .findByIdAndUpdate(id, updateRealPersonDto, { new: true })
      .exec();

    if (!updatedPerson) {
      throw new NotFoundException(`Persona física con ID ${id} no encontrada`);
    }

    return updatedPerson;
  }

  /**
   * Elimina una persona física
   */
  async remove(id: string): Promise<RealPerson> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de persona inválido');
    }

    const deletedPerson = await this.realPersonModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedPerson) {
      throw new NotFoundException(`Persona física con ID ${id} no encontrada`);
    }

    return deletedPerson;
  }
}
