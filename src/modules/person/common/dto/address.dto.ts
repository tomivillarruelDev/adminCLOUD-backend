import { IsNotEmpty, IsOptional, IsString, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    description: 'ID del país',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsMongoId()
  country: string;

  @ApiProperty({
    description: 'ID de la provincia o estado',
    example: '60d21b4667d0d8992e610c86',
  })
  @IsNotEmpty()
  @IsMongoId()
  state: string;

  @ApiProperty({
    description: 'ID de la ciudad',
    example: '60d21b4667d0d8992e610c87',
  })
  @IsNotEmpty()
  @IsMongoId()
  city: string;

  @ApiProperty({
    description: 'Calle principal',
    example: 'Av. Corrientes',
  })
  @IsNotEmpty()
  @IsString()
  mainStreet: string;

  @ApiPropertyOptional({
    description: 'Calle secundaria o intersección',
    example: 'Florida',
  })
  @IsOptional()
  @IsString()
  secondaryStreet?: string;

  @ApiPropertyOptional({
    description: 'Número de la dirección',
    example: '1234',
  })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional({
    description: 'Código postal',
    example: 'C1043AAZ',
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({
    description: 'Piso',
    example: '10',
  })
  @IsOptional()
  @IsString()
  floor?: string;

  @ApiPropertyOptional({
    description: 'Departamento o número de oficina',
    example: 'B',
  })
  @IsOptional()
  @IsString()
  apartment?: string;

  @ApiPropertyOptional({
    description: 'Nombre del edificio',
    example: 'Torre Acme',
  })
  @IsOptional()
  @IsString()
  building?: string;
}
