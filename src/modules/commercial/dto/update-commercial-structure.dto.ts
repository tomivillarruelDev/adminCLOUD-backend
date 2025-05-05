import { PartialType } from '@nestjs/mapped-types';
import { CreateCommercialStructureDto } from './create-commercial-structure.dto';

export class UpdateCommercialStructureDto extends PartialType(
  CreateCommercialStructureDto,
) {}
