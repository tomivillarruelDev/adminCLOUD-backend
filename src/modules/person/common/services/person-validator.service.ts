import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RealPerson } from '../../real-person/schemas/real-person.schema';
import { LegalPerson } from '../../legal-person/schemas/legal-person.schema';
import { IPersonValidator } from '../interfaces';

/**
 * Servicio que implementa las operaciones de validación de personas
 * centraliza la lógica de verificación de existencia para evitar duplicación
 */
@Injectable()
export class PersonValidatorService implements IPersonValidator {
  private readonly logger = new Logger(PersonValidatorService.name);

  constructor(
    @InjectModel(RealPerson.name)
    private readonly realPersonModel: Model<RealPerson>,
    @InjectModel(LegalPerson.name)
    private readonly legalPersonModel: Model<LegalPerson>,
  ) {}

  /**
   * Verifica que la persona real con el ID proporcionado exista en la base de datos
   */
  async verifyRealPersonExists(id: string): Promise<void> {
    try {
      const exists = await this.realPersonModel.findById(id).exec();
      if (!exists) {
        throw new BadRequestException(`La persona real con ID ${id} no existe`);
      }
    } catch (error) {
      this.handleIdValidationError(error, id, 'persona real');
    }
  }

  /**
   * Verifica que la persona legal con el ID proporcionado exista en la base de datos
   */
  async verifyLegalPersonExists(id: string): Promise<void> {
    try {
      const exists = await this.legalPersonModel.findById(id).exec();
      if (!exists) {
        throw new BadRequestException(
          `La persona legal con ID ${id} no existe`,
        );
      }
    } catch (error) {
      this.handleIdValidationError(error, id, 'persona legal');
    }
  }

  /**
   * Maneja errores comunes de validación de IDs de manera centralizada
   * @private
   */
  private handleIdValidationError(
    error: any,
    id: string,
    entityType: string,
  ): never {
    if (error instanceof BadRequestException) {
      throw error;
    }

    // Si el error es por un formato de ID inválido
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      throw new BadRequestException(`ID de ${entityType} inválido: ${id}`);
    }

    this.logger.error(
      `Error al verificar la existencia de ${entityType}: ${error.message}`,
      error.stack,
    );

    throw new InternalServerErrorException(
      `Error al verificar la existencia de ${entityType}: ${error.message}`,
    );
  }
}
