import { IsString, IsOptional } from 'class-validator';

export class CreateCommercialStructureDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
