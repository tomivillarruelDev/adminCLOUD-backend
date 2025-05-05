import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from '../schemas/agent.schema';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { UpdateAgentDto } from '../dto/update-agent.dto';

@Injectable()
export class AgentService {
  constructor(@InjectModel(Agent.name) private agentModel: Model<Agent>) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const createdAgent = new this.agentModel(createAgentDto);
    return createdAgent.save();
  }

  async findAll(): Promise<Agent[]> {
    return this.agentModel.find().exec();
  }

  async findOne(id: string): Promise<Agent> {
    const agent = await this.agentModel.findById(id).exec();
    if (!agent) throw new NotFoundException('Agent not found');
    return agent;
  }

  async update(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const updated = await this.agentModel
      .findByIdAndUpdate(id, updateAgentDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Agent not found');
    return updated;
  }

  async remove(id: string): Promise<Agent> {
    const deleted = await this.agentModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Agent not found');
    return deleted;
  }
}
