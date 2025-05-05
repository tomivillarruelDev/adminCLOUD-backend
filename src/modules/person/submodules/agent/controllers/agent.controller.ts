import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AgentService } from '../services/agent.service';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { UpdateAgentDto } from '../dto/update-agent.dto';
import { Agent } from '../schemas/agent.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Agentes')
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo agente' })
  @ApiBody({ type: CreateAgentDto })
  @ApiResponse({
    status: 201,
    description: 'El agente ha sido creado exitosamente',
    type: Agent,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentService.create(createAgentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los agentes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los agentes',
    type: [Agent],
  })
  findAll(): Promise<Agent[]> {
    return this.agentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un agente por ID' })
  @ApiParam({ name: 'id', description: 'ID del agente' })
  @ApiResponse({
    status: 200,
    description: 'Retorna el agente solicitado',
    type: Agent,
  })
  @ApiResponse({ status: 404, description: 'Agente no encontrado' })
  findOne(@Param('id') id: string): Promise<Agent> {
    return this.agentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un agente' })
  @ApiParam({ name: 'id', description: 'ID del agente a actualizar' })
  @ApiBody({ type: UpdateAgentDto })
  @ApiResponse({
    status: 200,
    description: 'El agente ha sido actualizado exitosamente',
    type: Agent,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Agente no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateAgentDto: UpdateAgentDto,
  ): Promise<Agent> {
    return this.agentService.update(id, updateAgentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un agente' })
  @ApiParam({ name: 'id', description: 'ID del agente a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'El agente ha sido eliminado exitosamente',
    type: Agent,
  })
  @ApiResponse({ status: 404, description: 'Agente no encontrado' })
  remove(@Param('id') id: string): Promise<Agent> {
    return this.agentService.remove(id);
  }
}
