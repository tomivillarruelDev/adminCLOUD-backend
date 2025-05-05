import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContactTypeEnum } from '../../../common/enums';
import { UpdateRealPersonDto } from '../../../real-person/dto/update-real-person.dto';
import { UpdateLegalPersonDto } from '../../../legal-person/dto/update-legal-person.dto';
import { CreateContactDto } from './create-contact.dto';

// Omitimos type, realPerson y legalPerson para poder redefinirlas
export class UpdateContactDto extends OmitType(CreateContactDto, [
  'type',
  'realPerson',
  'legalPerson',
] as const) {
  @IsOptional()
  @IsEnum(ContactTypeEnum)
  type?: ContactTypeEnum;

  @IsOptional()
  @IsString()
  notes?: string;

  // Referencias a personas existentes
  @IsOptional()
  @IsMongoId()
  realPersonId?: string;

  @IsOptional()
  @IsMongoId()
  legalPersonId?: string;

  // O actualizar datos de personas existentes
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateRealPersonDto)
  realPerson?: UpdateRealPersonDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLegalPersonDto)
  legalPerson?: UpdateLegalPersonDto;
}
