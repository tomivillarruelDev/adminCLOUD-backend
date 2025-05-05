import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GenderEnum } from '../../common/enums';
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
export class RealPerson extends Person {
  @ApiProperty({
    description: 'Segundo nombre de la persona',
    example: 'Antonio',
    required: false,
  })
  @Prop()
  middleName?: string;

  @ApiProperty({
    description: 'Apellido de la persona',
    example: 'González',
    required: true,
  })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({
    description: 'Nacionalidad de la persona',
    example: 'Argentina',
    required: true,
  })
  @Prop({ required: true })
  nationality: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    example: '1990-01-01T00:00:00.000Z',
    required: true,
    type: Date,
  })
  @Prop({ required: true })
  birthDate: Date;

  @ApiProperty({
    description: 'Lugar de nacimiento',
    example: 'Buenos Aires',
    required: true,
  })
  @Prop({ required: true })
  birthPlace: Date;

  @ApiProperty({
    description: 'Género de la persona',
    enum: GenderEnum,
    example: GenderEnum.MALE,
    required: true,
  })
  @Prop({
    type: String,
    enum: GenderEnum,
    required: true,
  })
  gender: GenderEnum;

  @ApiProperty({
    description: 'Identificaciones de la persona',
    type: [Identification],
    required: true,
  })
  @Prop({ type: [IdentificationSchema], required: true })
  identifications: Identification[];

  @ApiProperty({
    description: 'Dirección de la persona',
    type: Address,
    required: false,
  })
  @Prop({ type: AddressSchema })
  address: Address;
}

export const RealPersonSchema = SchemaFactory.createForClass(RealPerson);
