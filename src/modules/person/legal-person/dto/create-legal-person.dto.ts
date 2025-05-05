import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AddressDto } from '../../common/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLegalPersonDto {
  @ApiProperty({
    description: 'Nombre de la persona jurídica o empresa',
    example: 'Empresa ABC S.A.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico de la empresa',
    example: 'contacto@empresaabc.com',
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
    description: 'Número de identificación fiscal o CUIT/RUT',
    example: '30-12345678-9',
  })
  @IsNotEmpty()
  @IsString()
  taxId: string;

  @ApiProperty({
    description: 'Número de teléfono de la empresa',
    example: '+541123456789',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    description: 'URL del sitio web de la empresa',
    example: 'https://www.empresaabc.com',
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({
    description: 'Razón social de la empresa',
    example: 'Empresa ABC Sociedad Anónima',
  })
  @IsOptional()
  @IsString()
  socialReason?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico secundario de la empresa',
    example: 'ventas@empresaabc.com',
  })
  @IsOptional()
  @IsString()
  secondEmail?: string;

  @ApiProperty({
    description: 'Dirección física de la empresa',
    type: () => AddressDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
