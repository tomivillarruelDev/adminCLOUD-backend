import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRealPersonDto } from '../../../real-person/dto/create-real-person.dto';
import { CreateLegalPersonDto } from '../../../legal-person/dto/create-legal-person.dto';
import { ContactTypeEnum, PersonTypeEnum } from '../../../common/enums';

export class CreateContactDto {
  @IsNotEmpty()
  @IsEnum(ContactTypeEnum)
  type: ContactTypeEnum;

  @IsNotEmpty()
  @IsEnum(PersonTypeEnum)
  personType: PersonTypeEnum;

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

  // O crear nuevas personas directamente en el contacto
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRealPersonDto)
  realPerson?: CreateRealPersonDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLegalPersonDto)
  legalPerson?: CreateLegalPersonDto;
}
