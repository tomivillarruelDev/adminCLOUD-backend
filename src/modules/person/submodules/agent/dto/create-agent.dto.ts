import { IsString, IsOptional, IsEmail, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({
    description: 'Nombre del agente',
    example: 'Juan Pérez',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del agente',
    example: 'juan.perez@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Número de teléfono del agente',
    example: '+34123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'ID de la agencia a la que pertenece el agente',
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsMongoId()
  agencyId: string;
}
