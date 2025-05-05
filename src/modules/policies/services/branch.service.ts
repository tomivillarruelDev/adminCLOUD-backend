import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from '../schemas/branch.schema';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(@InjectModel(Branch.name) private branchModel: Model<Branch>) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const createdBranch = new this.branchModel(createBranchDto);
    return createdBranch.save();
  }

  async findAll(): Promise<Branch[]> {
    return this.branchModel.find().exec();
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchModel.findById(id).exec();
    if (!branch) throw new NotFoundException('Branch not found');
    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const updated = await this.branchModel
      .findByIdAndUpdate(id, updateBranchDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Branch not found');
    return updated;
  }

  async remove(id: string): Promise<Branch> {
    const deleted = await this.branchModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Branch not found');
    return deleted;
  }
}
