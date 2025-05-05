import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateContractLevelDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  level?: number;
}
