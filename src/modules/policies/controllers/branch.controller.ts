import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BranchService } from '../services/branch.service';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { Branch } from '../schemas/branch.schema';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  findAll(): Promise<Branch[]> {
    return this.branchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Branch> {
    return this.branchService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ): Promise<Branch> {
    return this.branchService.update(id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Branch> {
    return this.branchService.remove(id);
  }
}
