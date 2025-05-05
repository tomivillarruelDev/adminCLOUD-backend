import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PlanService } from '../services/plan.service';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { Plan } from '../schemas/plan.schema';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
    return this.planService.create(createPlanDto);
  }

  @Get()
  findAll(): Promise<Plan[]> {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Plan> {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ): Promise<Plan> {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Plan> {
    return this.planService.remove(id);
  }
}
