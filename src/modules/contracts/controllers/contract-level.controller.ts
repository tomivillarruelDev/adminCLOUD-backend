import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ContractLevelService } from '../services/contract-level.service';
import { CreateContractLevelDto } from '../dto/create-contract-level.dto';
import { UpdateContractLevelDto } from '../dto/update-contract-level.dto';
import { ContractLevel } from '../schemas/contract-level.schema';

@Controller('contract-level')
export class ContractLevelController {
  constructor(private readonly contractLevelService: ContractLevelService) {}

  @Post()
  create(@Body() createDto: CreateContractLevelDto): Promise<ContractLevel> {
    return this.contractLevelService.create(createDto);
  }

  @Get()
  findAll(): Promise<ContractLevel[]> {
    return this.contractLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ContractLevel> {
    return this.contractLevelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContractLevelDto,
  ): Promise<ContractLevel> {
    return this.contractLevelService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ContractLevel> {
    return this.contractLevelService.remove(id);
  }
}
