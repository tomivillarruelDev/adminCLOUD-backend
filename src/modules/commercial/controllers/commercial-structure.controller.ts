import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommercialStructureService } from '../services/commercial-structure.service';
import { CreateCommercialStructureDto } from '../dto/create-commercial-structure.dto';
import { UpdateCommercialStructureDto } from '../dto/update-commercial-structure.dto';
import { CommercialStructure } from '../schemas/commercial-structure.schema';

@Controller('commercial-structure')
export class CommercialStructureController {
  constructor(
    private readonly commercialStructureService: CommercialStructureService,
  ) {}

  @Post()
  create(
    @Body() createDto: CreateCommercialStructureDto,
  ): Promise<CommercialStructure> {
    return this.commercialStructureService.create(createDto);
  }

  @Get()
  findAll(): Promise<CommercialStructure[]> {
    return this.commercialStructureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CommercialStructure> {
    return this.commercialStructureService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCommercialStructureDto,
  ): Promise<CommercialStructure> {
    return this.commercialStructureService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CommercialStructure> {
    return this.commercialStructureService.remove(id);
  }
}
