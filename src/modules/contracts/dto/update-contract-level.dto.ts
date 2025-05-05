import { PartialType } from '@nestjs/mapped-types';
import { CreateContractLevelDto } from './create-contract-level.dto';

export class UpdateContractLevelDto extends PartialType(
  CreateContractLevelDto,
) {}
