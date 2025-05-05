import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { GenderEnum } from '../../common/enums';
import { AddressDto } from '../../common/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRealPersonDto {
  @ApiProperty({
    description: 'Nombre de la persona física',
    example: 'Juan',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Segundo nombre de la persona física',
    example: 'Carlos',
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({
    description: 'Apellido de la persona física',
    example: 'Pérez',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Correo electrónico de la persona física',
    example: 'juan.perez@ejemplo.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
    message: 'The email must be a valid email address',
  })
  email: string;

  @ApiProperty({
    description: 'Número de documento de identidad',
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  documentId: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '+5491123456789',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Nacionalidad de la persona',
    example: 'Argentina',
  })
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @ApiProperty({
    description: 'Lugar de nacimiento (en formato ISO 8601)',
    example: '1990-01-01',
  })
  @IsNotEmpty()
  @IsDateString() // Esto valida que sea un string en formato de fecha ISO 8601
  birthPlace: string; // Cambiado de Date a string para evitar problemas de conversión

  @ApiProperty({
    description: 'Género de la persona',
    enum: GenderEnum,
    example: 'male',
  })
  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty({
    description: 'Dirección de la persona',
    type: () => AddressDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
