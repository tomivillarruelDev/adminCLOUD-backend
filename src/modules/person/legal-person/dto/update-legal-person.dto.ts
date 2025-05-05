import { PartialType } from '@nestjs/mapped-types';
import { CreateLegalPersonDto } from './create-legal-person.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '../../common/dto';

export class UpdateLegalPersonDto extends PartialType(CreateLegalPersonDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}
