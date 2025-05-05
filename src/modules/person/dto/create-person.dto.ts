import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  ValidateIf,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PersonTypeEnum } from '../common/enums';
import { CreateRealPersonDto } from '../real-person/dto/create-real-person.dto';
import { CreateLegalPersonDto } from '../legal-person/dto/create-legal-person.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export { CreateRealPersonDto } from '../real-person/dto/create-real-person.dto';
export { CreateLegalPersonDto } from '../legal-person/dto/create-legal-person.dto';

export class CreatePersonDto {
  @ApiProperty({
    description: 'Nombre completo de la persona',
    example: 'Juan Pérez',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico de la persona',
    example: 'juan.perez@ejemplo.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Tipo de persona: física (REAL) o jurídica (LEGAL)',
    enum: PersonTypeEnum,
    example: 'real',
  })
  @IsEnum(PersonTypeEnum)
  personType: PersonTypeEnum;

  // === REAL PERSON VALIDATION ===
  @ApiPropertyOptional({
    description:
      'ID de la persona física existente (solo cuando personType es REAL)',
    example: '60d21b4667d0d8992e610c85',
  })
  @ValidateIf((o) => o.personType === PersonTypeEnum.REAL)
  @IsOptional()
  @IsMongoId()
  realPersonId?: string;

  @ApiPropertyOptional({
    description:
      'Datos para crear una nueva persona física (solo cuando personType es REAL)',
    type: () => CreateRealPersonDto,
  })
  @ValidateIf((o) => o.personType === PersonTypeEnum.REAL)
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRealPersonDto)
  realPerson?: CreateRealPersonDto;

  // === LEGAL PERSON VALIDATION ===
  @ApiPropertyOptional({
    description:
      'ID de la persona jurídica existente (solo cuando personType es LEGAL)',
    example: '60d21b4667d0d8992e610c86',
  })
  @ValidateIf((o) => o.personType === PersonTypeEnum.LEGAL)
  @IsOptional()
  @IsMongoId()
  legalPersonId?: string;

  @ApiPropertyOptional({
    description:
      'Datos para crear una nueva persona jurídica (solo cuando personType es LEGAL)',
    type: () => CreateLegalPersonDto,
  })
  @ValidateIf((o) => o.personType === PersonTypeEnum.LEGAL)
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLegalPersonDto)
  legalPerson?: CreateLegalPersonDto;
}
