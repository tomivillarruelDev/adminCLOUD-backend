import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RealPersonService } from '../services/real-person.service';
import { CreateRealPersonDto } from '../dto/create-real-person.dto';
import { UpdateRealPersonDto } from '../dto/update-real-person.dto';

/**
 * Controlador para gestionar personas físicas
 */
@ApiTags('real-persons')
@Controller('real-persons')
export class RealPersonController {
  constructor(private readonly realPersonService: RealPersonService) {}

  /**
   * Crea una nueva persona física
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva persona física' })
  @ApiResponse({
    status: 201,
    description: 'Persona física creada correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createRealPersonDto: CreateRealPersonDto) {
    return this.realPersonService.create(createRealPersonDto);
  }

  /**
   * Obtiene todas las personas físicas
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las personas físicas' })
  @ApiResponse({ status: 200, description: 'Lista de personas físicas' })
  findAll() {
    return this.realPersonService.findAll();
  }

  /**
   * Obtiene una persona física por su ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una persona física por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la persona física' })
  @ApiResponse({ status: 404, description: 'Persona física no encontrada' })
  findOne(@Param('id') id: string) {
    return this.realPersonService.findOne(id);
  }

  /**
   * Actualiza una persona física
   */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una persona física' })
  @ApiResponse({
    status: 200,
    description: 'Persona física actualizada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Persona física no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateRealPersonDto: UpdateRealPersonDto,
  ) {
    return this.realPersonService.update(id, updateRealPersonDto);
  }

  /**
   * Elimina una persona física
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una persona física' })
  @ApiResponse({
    status: 200,
    description: 'Persona física eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Persona física no encontrada' })
  remove(@Param('id') id: string) {
    return this.realPersonService.remove(id);
  }
}
