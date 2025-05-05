import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLegalPersonDto } from '../../../legal-person/dto/create-legal-person.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiProperty({
    description: 'ID de la persona legal asociada a esta compañía',
    example: '507f1f77bcf86cd799439011',
  })
  legalPersonId?: string;

  @ApiProperty({
    description:
      'Datos para actualizar o crear una nueva persona legal asociada',
    type: () => CreateLegalPersonDto,
  })
  legalPerson?: any;

  @ApiProperty({
    description: 'Nombre de la compañía o departamento',
    example: 'Acme Corporation',
  })
  name?: string;

  @ApiProperty({
    description: 'Email de contacto de la compañía',
    example: 'info@acme.com',
  })
  email?: string;

  @ApiProperty({
    description: 'Teléfono de contacto de la compañía',
    example: '+34911234567',
  })
  phone?: string;

  @ApiProperty({
    description: 'Posición o cargo dentro de la organización',
    example: 'Departamento de Ventas',
  })
  position?: string;
}
