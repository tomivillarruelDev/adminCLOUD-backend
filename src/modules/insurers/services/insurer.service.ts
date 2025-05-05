import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Insurer } from '../schemas/insurer.schema';
import { CreateInsurerDto } from '../dto/create-insurer.dto';
import { UpdateInsurerDto } from '../dto/update-insurer.dto';

@Injectable()
export class InsurerService {
  constructor(
    @InjectModel(Insurer.name) private insurerModel: Model<Insurer>,
  ) {}

  async create(createInsurerDto: CreateInsurerDto): Promise<Insurer> {
    const createdInsurer = new this.insurerModel(createInsurerDto);
    return createdInsurer.save();
  }

  async findAll(): Promise<Insurer[]> {
    return this.insurerModel.find().exec();
  }

  async findOne(id: string): Promise<Insurer> {
    const insurer = await this.insurerModel.findById(id).exec();
    if (!insurer) throw new NotFoundException('Insurer not found');
    return insurer;
  }

  async update(
    id: string,
    updateInsurerDto: UpdateInsurerDto,
  ): Promise<Insurer> {
    const updated = await this.insurerModel
      .findByIdAndUpdate(id, updateInsurerDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Insurer not found');
    return updated;
  }

  async remove(id: string): Promise<Insurer> {
    const deleted = await this.insurerModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Insurer not found');
    return deleted;
  }
}
