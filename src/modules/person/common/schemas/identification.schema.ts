import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  RealPersonIdentificationType,
  LegalPersonIdentificationType,
} from '../../common/enums';

@Schema()
export class Identification {
  @ApiProperty({
    description: 'Número de identificación',
    example: '12345678',
  })
  @Prop({ required: true })
  number: string;

  @ApiProperty({
    description: 'Tipo de identificación',
    example: 'passport',
    enum: [
      ...Object.values(RealPersonIdentificationType),
      ...Object.values(LegalPersonIdentificationType),
    ],
  })
  @Prop({
    type: String,
    required: true,
  })
  type: RealPersonIdentificationType | LegalPersonIdentificationType;
}

export const IdentificationSchema =
  SchemaFactory.createForClass(Identification);
