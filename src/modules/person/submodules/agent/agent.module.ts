import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from './schemas/agent.schema';
import { AgentController } from './controllers/agent.controller';
import { AgentService } from './services/agent.service';
import { CommonModule } from '../../common/common.module';

/**
 * Módulo para gestión de agentes
 * Un agente es un tipo de contacto que representa a otra persona
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
    CommonModule,
  ],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
