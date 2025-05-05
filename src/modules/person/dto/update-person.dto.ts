import { PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';

/**
 * DTO para actualizar una persona genérica
 * Extiende del DTO de creación pero hace todos los campos opcionales
 */
export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
