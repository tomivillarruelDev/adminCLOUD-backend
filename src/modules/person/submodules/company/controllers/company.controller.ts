import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Company } from '../schemas/company.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Compañías')
@Controller('company')
export class CompanyController {
  constructor(private readonly CompanyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva compañía' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'La compañía ha sido creada exitosamente',
    type: Company,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.CompanyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las compañías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las compañías',
    type: [Company],
  })
  findAll(): Promise<Company[]> {
    return this.CompanyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una compañía por ID' })
  @ApiParam({ name: 'id', description: 'ID de la compañía' })
  @ApiResponse({
    status: 200,
    description: 'Retorna la compañía solicitada',
    type: Company,
  })
  @ApiResponse({ status: 404, description: 'Compañía no encontrada' })
  findOne(@Param('id') id: string): Promise<Company> {
    return this.CompanyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una compañía' })
  @ApiParam({ name: 'id', description: 'ID de la compañía a actualizar' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({
    status: 200,
    description: 'La compañía ha sido actualizada exitosamente',
    type: Company,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Compañía no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.CompanyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una compañía' })
  @ApiParam({ name: 'id', description: 'ID de la compañía a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'La compañía ha sido eliminada exitosamente',
    type: Company,
  })
  @ApiResponse({ status: 404, description: 'Compañía no encontrada' })
  remove(@Param('id') id: string): Promise<Company> {
    return this.CompanyService.remove(id);
  }
}
