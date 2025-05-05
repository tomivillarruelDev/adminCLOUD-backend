import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from '../schemas/plan.schema';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan.name) private planModel: Model<Plan>) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const createdPlan = new this.planModel(createPlanDto);
    return createdPlan.save();
  }

  async findAll(): Promise<Plan[]> {
    return this.planModel.find().exec();
  }

  async findOne(id: string): Promise<Plan> {
    const plan = await this.planModel.findById(id).exec();
    if (!plan) throw new NotFoundException('Plan not found');
    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    const updated = await this.planModel
      .findByIdAndUpdate(id, updatePlanDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Plan not found');
    return updated;
  }

  async remove(id: string): Promise<Plan> {
    const deleted = await this.planModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Plan not found');
    return deleted;
  }
}
