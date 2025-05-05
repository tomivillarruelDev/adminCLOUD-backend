import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommercialStructure } from '../schemas/commercial-structure.schema';
import { CreateCommercialStructureDto } from '../dto/create-commercial-structure.dto';
import { UpdateCommercialStructureDto } from '../dto/update-commercial-structure.dto';

@Injectable()
export class CommercialStructureService {
  constructor(
    @InjectModel(CommercialStructure.name)
    private commercialStructureModel: Model<CommercialStructure>,
  ) {}

  async create(
    createDto: CreateCommercialStructureDto,
  ): Promise<CommercialStructure> {
    const created = new this.commercialStructureModel(createDto);
    return created.save();
  }

  async findAll(): Promise<CommercialStructure[]> {
    return this.commercialStructureModel.find().exec();
  }

  async findOne(id: string): Promise<CommercialStructure> {
    const found = await this.commercialStructureModel.findById(id).exec();
    if (!found) throw new NotFoundException('CommercialStructure not found');
    return found;
  }

  async update(
    id: string,
    updateDto: UpdateCommercialStructureDto,
  ): Promise<CommercialStructure> {
    const updated = await this.commercialStructureModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('CommercialStructure not found');
    return updated;
  }

  async remove(id: string): Promise<CommercialStructure> {
    const deleted = await this.commercialStructureModel
      .findByIdAndDelete(id)
      .exec();
    if (!deleted) throw new NotFoundException('CommercialStructure not found');
    return deleted;
  }
}
