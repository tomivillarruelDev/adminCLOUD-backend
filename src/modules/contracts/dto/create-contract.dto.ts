import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateContractDto {
  @IsString()
  contractNumber: string;

  @IsString()
  clientName: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
