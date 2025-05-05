import { PartialType } from '@nestjs/mapped-types';
import { CreateRealPersonDto } from './create-real-person.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { GenderEnum } from '../../common/enums';

export class UpdateRealPersonDto extends PartialType(CreateRealPersonDto) {
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}
