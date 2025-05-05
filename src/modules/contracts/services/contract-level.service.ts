import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContractLevel } from '../schemas/contract-level.schema';
import { CreateContractLevelDto } from '../dto/create-contract-level.dto';
import { UpdateContractLevelDto } from '../dto/update-contract-level.dto';

@Injectable()
export class ContractLevelService {
  constructor(
    @InjectModel(ContractLevel.name)
    private contractLevelModel: Model<ContractLevel>,
  ) {}

  async create(createDto: CreateContractLevelDto): Promise<ContractLevel> {
    const created = new this.contractLevelModel(createDto);
    return created.save();
  }

  async findAll(): Promise<ContractLevel[]> {
    return this.contractLevelModel.find().exec();
  }

  async findOne(id: string): Promise<ContractLevel> {
    const found = await this.contractLevelModel.findById(id).exec();
    if (!found) throw new NotFoundException('ContractLevel not found');
    return found;
  }

  async update(
    id: string,
    updateDto: UpdateContractLevelDto,
  ): Promise<ContractLevel> {
    const updated = await this.contractLevelModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('ContractLevel not found');
    return updated;
  }

  async remove(id: string): Promise<ContractLevel> {
    const deleted = await this.contractLevelModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('ContractLevel not found');
    return deleted;
  }
}
