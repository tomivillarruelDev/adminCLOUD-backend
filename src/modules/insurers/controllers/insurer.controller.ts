import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { InsurerService } from '../services/insurer.service';
import { CreateInsurerDto } from '../dto/create-insurer.dto';
import { UpdateInsurerDto } from '../dto/update-insurer.dto';
import { Insurer } from '../schemas/insurer.schema';

@Controller('insurer')
export class InsurerController {
  constructor(private readonly insurerService: InsurerService) {}

  @Post()
  create(@Body() createInsurerDto: CreateInsurerDto): Promise<Insurer> {
    return this.insurerService.create(createInsurerDto);
  }

  @Get()
  findAll(): Promise<Insurer[]> {
    return this.insurerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Insurer> {
    return this.insurerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInsurerDto: UpdateInsurerDto,
  ): Promise<Insurer> {
    return this.insurerService.update(id, updateInsurerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Insurer> {
    return this.insurerService.remove(id);
  }
}
