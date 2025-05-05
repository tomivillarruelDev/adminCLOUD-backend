import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Person } from '../../common/schemas/person.schema';
import {
  Address,
  AddressSchema,
} from 'src/modules/location/schemas/address.schema';
import {
  Identification,
  IdentificationSchema,
} from '../../common/schemas/identification.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class LegalPerson extends Person {
  @ApiProperty({
    description: 'URL del sitio web',
    example: 'https://www.empresa.com',
    required: false,
  })
  @Prop()
  url?: string;

  @ApiProperty({
    description: 'Razón social de la empresa',
    example: 'Empresa S.A.',
    required: false,
  })
  @Prop()
  socialReason?: string;

  @ApiProperty({
    description: 'Email secundario de contacto',
    example: 'contacto@empresa.com',
    required: false,
  })
  @Prop()
  secondEmail?: string;

  @ApiProperty({
    description: 'Identificaciones de la persona jurídica',
    type: [Identification],
    required: true,
  })
  @Prop({ type: [IdentificationSchema], required: true })
  identifications: Identification[];

  @ApiProperty({
    description: 'Dirección de la persona jurídica',
    type: Address,
    required: false,
  })
  @Prop({ type: AddressSchema })
  address: Address;
}

export const LegalPersonSchema = SchemaFactory.createForClass(LegalPerson);
