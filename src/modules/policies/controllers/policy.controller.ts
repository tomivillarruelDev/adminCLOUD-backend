import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PolicyService } from '../services/policy.service';
import { CreatePolicyDto } from '../dto/create-policy.dto';
import { UpdatePolicyDto } from '../dto/update-policy.dto';
import { Policy } from '../schemas/policy.schema';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto): Promise<Policy> {
    return this.policyService.create(createPolicyDto);
  }

  @Get()
  findAll(): Promise<Policy[]> {
    return this.policyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Policy> {
    return this.policyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePolicyDto: UpdatePolicyDto,
  ): Promise<Policy> {
    return this.policyService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Policy> {
    return this.policyService.remove(id);
  }
}
