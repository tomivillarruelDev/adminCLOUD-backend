import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentDto } from './create-agent.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAgentDto extends PartialType(CreateAgentDto) {
  @ApiProperty({
    description: 'Nombre del agente',
    example: 'Juan Pérez',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Correo electrónico del agente',
    example: 'juan.perez@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Número de teléfono del agente',
    example: '+34123456789',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'ID de la agencia a la que pertenece el agente',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  agencyId?: string;
}
