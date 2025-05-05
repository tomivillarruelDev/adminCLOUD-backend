import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contract } from '../schemas/contract.schema';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract.name) private contractModel: Model<Contract>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const createdContract = new this.contractModel(createContractDto);
    return createdContract.save();
  }

  async findAll(): Promise<Contract[]> {
    return this.contractModel.find().exec();
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractModel.findById(id).exec();
    if (!contract) throw new NotFoundException('Contract not found');
    return contract;
  }

  async update(
    id: string,
    updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    const updated = await this.contractModel
      .findByIdAndUpdate(id, updateContractDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Contract not found');
    return updated;
  }

  async remove(id: string): Promise<Contract> {
    const deleted = await this.contractModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Contract not found');
    return deleted;
  }
}
