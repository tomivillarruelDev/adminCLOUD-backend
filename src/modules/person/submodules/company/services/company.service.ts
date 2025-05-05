import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, Types } from 'mongoose';
import { Company } from '../schemas/company.schema';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { LegalPerson } from '../../../legal-person/schemas/legal-person.schema';
import { IPersonValidator, PERSON_VALIDATOR } from '../../../common/interfaces';

// Definimos un tipo para los documentos de MongoDB
type MongoDocument = Document & {
  _id: Types.ObjectId;
};

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    @InjectModel(LegalPerson.name)
    private readonly legalPersonModel: Model<LegalPerson>,
    @Inject(PERSON_VALIDATOR)
    private readonly personValidator: IPersonValidator,
  ) {}

  async create(dto: CreateCompanyDto): Promise<Company> {
    try {
      // Validar que hay información de persona legal
      this.validateLegalPersonRequirements(dto);

      // Procesar la información de persona legal
      const legalPersonId = await this.processLegalPerson(dto);

      // Crear la compañía con la referencia a la persona legal
      const companyData = {
        ...dto,
        legalPerson: legalPersonId,
      };

      return await this.saveCompany(companyData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().populate('legalPerson').exec();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel
      .findById(id)
      .populate('legalPerson')
      .exec();

    if (!company) {
      throw new NotFoundException(`Compañía con ID ${id} no encontrada`);
    }

    return company;
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<Company> {
    try {
      // Si se actualiza la información de persona legal, procesarla
      if (dto.legalPerson || dto.legalPersonId) {
        const legalPersonId = await this.processLegalPerson(
          dto as CreateCompanyDto,
        );

        // Crear un nuevo objeto para la actualización, omitiendo legalPerson y legalPersonId
        const updateData: any = {
          ...dto,
          legalPerson: undefined,
          legalPersonId: undefined,
        };

        // Añadir la referencia correcta de legalPerson como una propiedad separada
        updateData.legalPerson = legalPersonId;

        const updated = await this.companyModel
          .findByIdAndUpdate(id, updateData, { new: true })
          .populate('legalPerson')
          .exec();

        if (!updated) {
          throw new NotFoundException(`Compañía con ID ${id} no encontrada`);
        }

        return updated;
      } else {
        // Si no hay actualizaciones relacionadas con legalPerson, proceder normalmente
        const updated = await this.companyModel
          .findByIdAndUpdate(id, dto, { new: true })
          .populate('legalPerson')
          .exec();

        if (!updated) {
          throw new NotFoundException(`Compañía con ID ${id} no encontrada`);
        }

        return updated;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string): Promise<Company> {
    const deleted = await this.companyModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Compañía con ID ${id} no encontrada`);
    }

    return deleted;
  }

  // Métodos privados para separación de responsabilidades

  private async processLegalPerson(dto: CreateCompanyDto): Promise<string> {
    if (dto.legalPersonId) {
      // Verificar que la persona legal con ese ID existe usando la interfaz
      await this.personValidator.verifyLegalPersonExists(dto.legalPersonId);
      return dto.legalPersonId;
    }

    if (dto.legalPerson) {
      const legalPersonData = this.prepareLegalPersonData(dto);
      const savedPerson = await this.createLegalPerson(legalPersonData);
      return savedPerson._id.toString();
    }

    throw new BadRequestException('Se requieren datos de persona legal');
  }

  private prepareLegalPersonData(dto: CreateCompanyDto): Record<string, any> {
    if (!dto.legalPerson) {
      throw new BadRequestException(
        'Los datos de persona legal son requeridos',
      );
    }

    return {
      ...dto.legalPerson,
      type: 'legal',
    };
  }

  private async createLegalPerson(
    personData: Record<string, any>,
  ): Promise<MongoDocument> {
    const newPerson = new this.legalPersonModel(personData);
    return (await newPerson.save()) as MongoDocument;
  }

  private async saveCompany(
    companyData: Record<string, any>,
  ): Promise<Company> {
    const newCompany = new this.companyModel(companyData);
    return await newCompany.save();
  }

  private validateLegalPersonRequirements(dto: CreateCompanyDto): void {
    if (!this.hasLegalPersonData(dto.legalPerson, dto.legalPersonId)) {
      throw new BadRequestException(
        'Una compañía debe tener asignada una persona legal',
      );
    }
  }

  private hasLegalPersonData(
    legalPerson?: any,
    legalPersonId?: string,
  ): boolean {
    return !!legalPerson || !!legalPersonId;
  }

  private handleError(error: any): never {
    this.logger.error(
      `Error al procesar compañía: ${error.message}`,
      error.stack,
    );

    if (error instanceof BadRequestException) {
      throw error;
    }

    if (error.name === 'ValidationError') {
      throw new BadRequestException(`Error de validación: ${error.message}`);
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new BadRequestException('Ya existe una compañía con estos datos.');
    }

    throw new InternalServerErrorException(
      `Error al procesar compañía: ${error.message}`,
    );
  }
}
