import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreatePolicyDto {
  @IsString()
  policyNumber: string;

  @IsString()
  insuredName: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsNumber()
  premium?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
