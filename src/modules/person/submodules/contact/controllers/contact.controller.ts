import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../schemas/contact.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('contact')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contacto' })
  @ApiBody({
    type: CreateContactDto,
    description: 'Datos del contacto a crear',
  })
  @ApiResponse({
    status: 201,
    description: 'Contacto creado correctamente',
    type: Contact,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los contactos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de contactos',
    type: [Contact],
  })
  findAll(): Promise<Contact[]> {
    return this.contactService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contacto por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del contacto',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Contacto encontrado',
    type: Contact,
  })
  @ApiResponse({ status: 404, description: 'Contacto no encontrado' })
  findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un contacto existente' })
  @ApiParam({
    name: 'id',
    description: 'ID del contacto a actualizar',
    type: String,
  })
  @ApiBody({
    type: UpdateContactDto,
    description: 'Datos del contacto a actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Contacto actualizado correctamente',
    type: Contact,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Contacto no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contacto' })
  @ApiParam({
    name: 'id',
    description: 'ID del contacto a eliminar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Contacto eliminado correctamente',
    type: Contact,
  })
  @ApiResponse({ status: 404, description: 'Contacto no encontrado' })
  remove(@Param('id') id: string): Promise<Contact> {
    return this.contactService.remove(id);
  }
}
