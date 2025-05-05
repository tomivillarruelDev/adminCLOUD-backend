import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ContractService } from '../services/contract.service';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';
import { Contract } from '../schemas/contract.schema';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
    return this.contractService.create(createContractDto);
  }

  @Get()
  findAll(): Promise<Contract[]> {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Contract> {
    return this.contractService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    return this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Contract> {
    return this.contractService.remove(id);
  }
}
