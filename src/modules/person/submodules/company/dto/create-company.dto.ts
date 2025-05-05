import {
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLegalPersonDto } from '../../../legal-person/dto/create-legal-person.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description:
      'ID de la persona legal asociada a esta compañía (opcional si se proporciona el objeto legalPerson)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsOptional()
  legalPersonId?: string;

  @ApiProperty({
    description:
      'Datos para crear una nueva persona legal asociada (opcional si se proporciona legalPersonId)',
    type: () => CreateLegalPersonDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateLegalPersonDto)
  legalPerson?: CreateLegalPersonDto;

  @ApiProperty({
    description: 'Nombre de la compañía o departamento',
    example: 'Acme Corporation',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email de contacto de la compañía',
    example: 'info@acme.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Teléfono de contacto de la compañía',
    example: '+34911234567',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Posición o cargo dentro de la organización',
    example: 'Departamento de Ventas',
  })
  @IsOptional()
  @IsString()
  position?: string;
}
