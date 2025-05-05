import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LegalPersonService } from '../services/legal-person.service';
import { CreateLegalPersonDto } from '../dto/create-legal-person.dto';
import { UpdateLegalPersonDto } from '../dto/update-legal-person.dto';

/**
 * Controlador para gestionar personas jurídicas
 */
@ApiTags('legal-persons')
@Controller('legal-persons')
export class LegalPersonController {
  constructor(private readonly legalPersonService: LegalPersonService) {}

  /**
   * Crea una nueva persona jurídica
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva persona jurídica' })
  @ApiResponse({
    status: 201,
    description: 'Persona jurídica creada correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createLegalPersonDto: CreateLegalPersonDto) {
    return this.legalPersonService.create(createLegalPersonDto);
  }

  /**
   * Obtiene todas las personas jurídicas
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las personas jurídicas' })
  @ApiResponse({ status: 200, description: 'Lista de personas jurídicas' })
  findAll() {
    return this.legalPersonService.findAll();
  }

  /**
   * Obtiene una persona jurídica por su ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una persona jurídica por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la persona jurídica' })
  @ApiResponse({ status: 404, description: 'Persona jurídica no encontrada' })
  findOne(@Param('id') id: string) {
    return this.legalPersonService.findOne(id);
  }

  /**
   * Actualiza una persona jurídica
   */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una persona jurídica' })
  @ApiResponse({
    status: 200,
    description: 'Persona jurídica actualizada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Persona jurídica no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateLegalPersonDto: UpdateLegalPersonDto,
  ) {
    return this.legalPersonService.update(id, updateLegalPersonDto);
  }

  /**
   * Elimina una persona jurídica
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una persona jurídica' })
  @ApiResponse({
    status: 200,
    description: 'Persona jurídica eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Persona jurídica no encontrada' })
  remove(@Param('id') id: string) {
    return this.legalPersonService.remove(id);
  }
}
