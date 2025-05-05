import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { CreateRealPersonDto } from '../real-person/dto/create-real-person.dto';
import { CreateLegalPersonDto } from '../legal-person/dto/create-legal-person.dto';
import { UpdateRealPersonDto } from '../real-person/dto/update-real-person.dto';
import { UpdateLegalPersonDto } from '../legal-person/dto/update-legal-person.dto';
import { Person } from '../common/schemas/person.schema';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva persona',
    description: 'Crea una persona (genérica, física o jurídica)',
  })
  @ApiBody({
    type: CreatePersonDto,
    description:
      'Datos para crear una persona genérica. Para personas físicas o jurídicas, consulta la documentación específica.',
  })
  @ApiResponse({
    status: 201,
    description: 'Persona creada exitosamente',
    type: Person,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados' })
  create(
    @Body()
    createPersonDto:
      | CreatePersonDto
      | CreateRealPersonDto
      | CreateLegalPersonDto,
  ): Promise<Person> {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las personas',
    description: 'Recupera la lista de todas las personas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de personas obtenida correctamente',
    type: [Person],
  })
  findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una persona por ID',
    description: 'Recupera la información de una persona específica',
  })
  @ApiParam({ name: 'id', description: 'ID de la persona', type: String })
  @ApiResponse({ status: 200, description: 'Persona encontrada', type: Person })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  findOne(@Param('id') id: string): Promise<Person> {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una persona',
    description: 'Actualiza la información de una persona existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la persona a actualizar',
    type: String,
  })
  @ApiBody({
    type: UpdatePersonDto,
    description:
      'Datos para actualizar una persona genérica. Para personas físicas o jurídicas, consulta la documentación específica.',
  })
  @ApiResponse({
    status: 200,
    description: 'Persona actualizada correctamente',
    type: Person,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  update(
    @Param('id') id: string,
    @Body()
    updatePersonDto:
      | UpdatePersonDto
      | UpdateRealPersonDto
      | UpdateLegalPersonDto,
  ): Promise<Person> {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una persona',
    description: 'Elimina una persona por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la persona a eliminar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Persona eliminada correctamente',
    type: Person,
  })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  remove(@Param('id') id: string): Promise<Person> {
    return this.personService.remove(id);
  }
}
