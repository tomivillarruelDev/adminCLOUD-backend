import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { RealPerson } from '../../../real-person/schemas/real-person.schema';
import { LegalPerson } from '../../../legal-person/schemas/legal-person.schema';
import { ContactTypeEnum, PersonTypeEnum } from '../../../common/enums';

/**
 * Esquema de contacto que puede estar vinculado a una persona real, legal o ambas
 * según el tipo de persona especificado en personType
 */
@Schema({ timestamps: true })
export class Contact extends Document {
  /**
   * Referencia a una persona real
   * Requerido si personType es REAL o MIXED
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RealPerson',
    required: function (this: Contact) {
      return (
        this.personType === PersonTypeEnum.REAL ||
        this.personType === PersonTypeEnum.MIXED
      );
    },
  })
  realPerson?: RealPerson;

  /**
   * Referencia a una persona legal (empresa)
   * Requerido si personType es LEGAL o MIXED
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LegalPerson',
    required: function (this: Contact) {
      return (
        this.personType === PersonTypeEnum.LEGAL ||
        this.personType === PersonTypeEnum.MIXED
      );
    },
  })
  legalPerson?: LegalPerson;

  /**
   * Tipo de contacto: cliente, proveedor, empleado u otro
   */
  @Prop({ required: true, enum: ContactTypeEnum })
  contactType: ContactTypeEnum;

  /**
   * Tipo de persona: real (física), legal (jurídica) o mixta
   */
  @Prop({ required: true, enum: PersonTypeEnum })
  personType: PersonTypeEnum;

  /**
   * Notas adicionales sobre el contacto
   */
  @Prop()
  notes?: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

// Añadir validadores a nivel de esquema para garantizar la integridad de los datos
ContactSchema.pre('validate', function (next) {
  const contact = this as unknown as Contact;

  // Validar que las referencias necesarias existan según el tipo de persona
  if (contact.personType === PersonTypeEnum.REAL && !contact.realPerson) {
    const error = new mongoose.Error.ValidationError();
    error.errors.realPerson = new mongoose.Error.ValidatorError({
      message: 'Se requiere una persona real para el tipo REAL',
      path: 'realPerson',
      type: 'required',
    });
    return next(error);
  }

  if (contact.personType === PersonTypeEnum.LEGAL && !contact.legalPerson) {
    const error = new mongoose.Error.ValidationError();
    error.errors.legalPerson = new mongoose.Error.ValidatorError({
      message: 'Se requiere una persona legal para el tipo LEGAL',
      path: 'legalPerson',
      type: 'required',
    });
    return next(error);
  }

  if (
    contact.personType === PersonTypeEnum.MIXED &&
    (!contact.realPerson || !contact.legalPerson)
  ) {
    const error = new mongoose.Error.ValidationError();
    if (!contact.realPerson) {
      error.errors.realPerson = new mongoose.Error.ValidatorError({
        message: 'Se requiere una persona real para el tipo MIXED',
        path: 'realPerson',
        type: 'required',
      });
    }
    if (!contact.legalPerson) {
      error.errors.legalPerson = new mongoose.Error.ValidatorError({
        message: 'Se requiere una persona legal para el tipo MIXED',
        path: 'legalPerson',
        type: 'required',
      });
    }
    return next(error);
  }

  next();
});
