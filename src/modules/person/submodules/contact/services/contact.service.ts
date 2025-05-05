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
import { Contact } from '../schemas/contact.schema';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { RealPerson } from '../../../real-person/schemas/real-person.schema';
import { LegalPerson } from '../../../legal-person/schemas/legal-person.schema';
import { PersonTypeEnum, ContactTypeEnum } from '../../../common/enums';
import { IPersonValidator, PERSON_VALIDATOR } from '../../../common/interfaces';

interface ContactData {
  contactType: ContactTypeEnum;
  personType: PersonTypeEnum;
  notes?: string;
  realPerson?: string;
  legalPerson?: string;
}

// Definimos un tipo para los documentos de MongoDB
type MongoDocument = Document & {
  _id: Types.ObjectId;
};

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
    @InjectModel(RealPerson.name)
    private readonly realPersonModel: Model<RealPerson>,
    @InjectModel(LegalPerson.name)
    private readonly legalPersonModel: Model<LegalPerson>,
    @Inject(PERSON_VALIDATOR)
    private readonly personValidator: IPersonValidator,
  ) {}

  async create(dto: CreateContactDto): Promise<Contact> {
    try {
      this.validatePersonRequirements(dto);

      const contactData = await this.prepareContactData(dto);
      return await this.saveContact(contactData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel
      .find()
      .populate('realPerson')
      .populate('legalPerson')
      .exec();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel
      .findById(id)
      .populate('realPerson')
      .populate('legalPerson')
      .exec();

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return contact;
  }

  async update(id: string, dto: UpdateContactDto): Promise<Contact> {
    const updatedContact = await this.contactModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('realPerson')
      .populate('legalPerson')
      .exec();

    if (!updatedContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return updatedContact;
  }

  async remove(id: string): Promise<Contact> {
    const deletedContact = await this.contactModel.findByIdAndDelete(id).exec();

    if (!deletedContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return deletedContact;
  }

  // Métodos privados para separación de responsabilidades

  private async prepareContactData(
    dto: CreateContactDto,
  ): Promise<ContactData> {
    const contactData: ContactData = {
      contactType: dto.type,
      personType: dto.personType,
      notes: dto.notes,
    };

    if (this.shouldProcessRealPerson(dto)) {
      contactData.realPerson = await this.processRealPerson(dto);
    }

    if (this.shouldProcessLegalPerson(dto)) {
      contactData.legalPerson = await this.processLegalPerson(dto);
    }

    return contactData;
  }

  private shouldProcessRealPerson(dto: CreateContactDto): boolean {
    return (
      dto.personType === PersonTypeEnum.REAL ||
      dto.personType === PersonTypeEnum.MIXED
    );
  }

  private shouldProcessLegalPerson(dto: CreateContactDto): boolean {
    return (
      dto.personType === PersonTypeEnum.LEGAL ||
      dto.personType === PersonTypeEnum.MIXED
    );
  }

  private async processRealPerson(dto: CreateContactDto): Promise<string> {
    if (dto.realPersonId) {
      // Verificar que la persona real con ese ID existe usando la interfaz
      await this.personValidator.verifyRealPersonExists(dto.realPersonId);
      return dto.realPersonId;
    }

    if (dto.realPerson) {
      const realPersonData = this.prepareRealPersonData(dto);
      const savedPerson = await this.createRealPerson(realPersonData);
      return savedPerson._id.toString();
    }

    throw new BadRequestException('Se requieren datos de persona real');
  }

  private async processLegalPerson(dto: CreateContactDto): Promise<string> {
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

  private prepareRealPersonData(dto: CreateContactDto): Record<string, any> {
    if (!dto.realPerson) {
      throw new BadRequestException('Los datos de persona real son requeridos');
    }

    return {
      ...dto.realPerson,
      type: 'real',
      birthDate: dto.realPerson.birthPlace,
    };
  }

  private prepareLegalPersonData(dto: CreateContactDto): Record<string, any> {
    return {
      ...dto.legalPerson,
      type: 'legal',
    };
  }

  private async createRealPerson(
    personData: Record<string, any>,
  ): Promise<MongoDocument> {
    const newPerson = new this.realPersonModel(personData);
    return (await newPerson.save()) as MongoDocument;
  }

  private async createLegalPerson(
    personData: Record<string, any>,
  ): Promise<MongoDocument> {
    const newPerson = new this.legalPersonModel(personData);
    return (await newPerson.save()) as MongoDocument;
  }

  private async saveContact(contactData: ContactData): Promise<Contact> {
    const newContact = new this.contactModel(contactData);
    return await newContact.save();
  }

  private validatePersonRequirements(dto: CreateContactDto): void {
    const { personType, realPerson, realPersonId, legalPerson, legalPersonId } =
      dto;

    if (
      personType === PersonTypeEnum.REAL &&
      !this.hasRealPersonData(realPerson, realPersonId)
    ) {
      throw new BadRequestException(
        'Para tipo de persona "real", debe proporcionar realPerson o realPersonId',
      );
    }

    if (
      personType === PersonTypeEnum.LEGAL &&
      !this.hasLegalPersonData(legalPerson, legalPersonId)
    ) {
      throw new BadRequestException(
        'Para tipo de persona "legal", debe proporcionar legalPerson o legalPersonId',
      );
    }

    if (personType === PersonTypeEnum.MIXED) {
      if (!this.hasRealPersonData(realPerson, realPersonId)) {
        throw new BadRequestException(
          'Para tipo de persona "mixed", debe proporcionar datos de persona real',
        );
      }

      if (!this.hasLegalPersonData(legalPerson, legalPersonId)) {
        throw new BadRequestException(
          'Para tipo de persona "mixed", debe proporcionar datos de persona legal',
        );
      }
    }
  }

  private hasRealPersonData(realPerson?: any, realPersonId?: string): boolean {
    return !!realPerson || !!realPersonId;
  }

  private hasLegalPersonData(
    legalPerson?: any,
    legalPersonId?: string,
  ): boolean {
    return !!legalPerson || !!legalPersonId;
  }

  private handleError(error: any): never {
    this.logger.error(`Error al crear contacto: ${error.message}`, error.stack);

    if (error instanceof BadRequestException) {
      throw error;
    }

    if (error.name === 'ValidationError') {
      throw new BadRequestException(`Error de validación: ${error.message}`);
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new BadRequestException('Ya existe un contacto con estos datos.');
    }

    throw new InternalServerErrorException(
      `Error al crear el contacto: ${error.message}`,
    );
  }
}
