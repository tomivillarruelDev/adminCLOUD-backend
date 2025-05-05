import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { LegalPerson } from '../../../legal-person/schemas/legal-person.schema';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Esquema de compañía que siempre está vinculada a una persona legal
 * y contiene información específica de la organización
 */
@Schema({ timestamps: true })
export class Company extends Document {
  /**
   * Referencia a la persona legal asociada a esta compañía
   * Este campo es obligatorio
   */
  @ApiProperty({
    description: 'Referencia a la persona legal asociada a esta compañía',
    type: 'string',
    format: 'mongo-id',
    required: true,
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LegalPerson',
    required: true,
  })
  legalPerson: LegalPerson;

  /**
   * Nombre de la compañía o departamento
   */
  @ApiProperty({
    description: 'Nombre de la compañía o departamento',
    example: 'Acme Corporation',
    required: true,
  })
  @Prop({ required: true })
  name: string;

  /**
   * Email de contacto de la compañía
   */
  @ApiProperty({
    description: 'Email de contacto de la compañía',
    example: 'info@acme.com',
    required: false,
  })
  @Prop()
  email?: string;

  /**
   * Teléfono de contacto de la compañía
   */
  @ApiProperty({
    description: 'Teléfono de contacto de la compañía',
    example: '+34911234567',
    required: false,
  })
  @Prop()
  phone?: string;

  /**
   * Posición o cargo dentro de la organización
   */
  @ApiProperty({
    description: 'Posición o cargo dentro de la organización',
    example: 'Departamento de Ventas',
    required: false,
  })
  @Prop()
  position?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

// Añadir validadores a nivel de esquema para garantizar la integridad de los datos
CompanySchema.pre('validate', function (next) {
  const company = this as Company;

  // Validar que la referencia a la persona legal exista
  if (!company.legalPerson) {
    const error = new mongoose.Error.ValidationError();
    error.errors.legalPerson = new mongoose.Error.ValidatorError({
      message: 'Una compañía debe tener asociada una persona legal',
      path: 'legalPerson',
      type: 'required',
    });
    return next(error);
  }

  next();
});
