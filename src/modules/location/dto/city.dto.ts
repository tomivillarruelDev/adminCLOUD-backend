import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  postalCodes?: string[];

  @IsNotEmpty()
  @IsMongoId()
  state: Types.ObjectId | string;
}

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  postalCodes?: string[];

  @IsOptional()
  @IsMongoId()
  state?: Types.ObjectId | string;
}
