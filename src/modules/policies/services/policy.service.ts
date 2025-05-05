import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Policy } from '../schemas/policy.schema';
import { CreatePolicyDto } from '../dto/create-policy.dto';
import { UpdatePolicyDto } from '../dto/update-policy.dto';

@Injectable()
export class PolicyService {
  constructor(@InjectModel(Policy.name) private policyModel: Model<Policy>) {}

  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const createdPolicy = new this.policyModel(createPolicyDto);
    return createdPolicy.save();
  }

  async findAll(): Promise<Policy[]> {
    return this.policyModel.find().exec();
  }

  async findOne(id: string): Promise<Policy> {
    const policy = await this.policyModel.findById(id).exec();
    if (!policy) throw new NotFoundException('Policy not found');
    return policy;
  }

  async update(id: string, updatePolicyDto: UpdatePolicyDto): Promise<Policy> {
    const updated = await this.policyModel
      .findByIdAndUpdate(id, updatePolicyDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Policy not found');
    return updated;
  }

  async remove(id: string): Promise<Policy> {
    const deleted = await this.policyModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Policy not found');
    return deleted;
  }
}
