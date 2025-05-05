import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency } from '../schemas/agency.schema';
import { CreateAgencyDto } from '../dto/create-agency.dto';
import { UpdateAgencyDto } from '../dto/update-agency.dto';

@Injectable()
export class AgencyService {
  constructor(@InjectModel(Agency.name) private agencyModel: Model<Agency>) {}

  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    const createdAgency = new this.agencyModel(createAgencyDto);
    return createdAgency.save();
  }

  async findAll(): Promise<Agency[]> {
    return this.agencyModel.find().exec();
  }

  async findOne(id: string): Promise<Agency> {
    const agency = await this.agencyModel.findById(id).exec();
    if (!agency) throw new NotFoundException('Agency not found');
    return agency;
  }

  async update(id: string, updateAgencyDto: UpdateAgencyDto): Promise<Agency> {
    const updated = await this.agencyModel
      .findByIdAndUpdate(id, updateAgencyDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Agency not found');
    return updated;
  }

  async remove(id: string): Promise<Agency> {
    const deleted = await this.agencyModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Agency not found');
    return deleted;
  }
}
