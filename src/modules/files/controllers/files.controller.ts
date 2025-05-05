import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfigs } from '../helpers';
import { CloudinaryService } from '../services/cloudinary.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Archivos')
@Controller('files')
export class FilesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @ApiOperation({ summary: 'Cargar un archivo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo a cargar (máximo 20MB)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Archivo cargado correctamente',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        public_id: { type: 'string' },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', MulterConfigs.ALL))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryService.uploadImage(file);
  }

  @ApiOperation({ summary: 'Obtener URL de un archivo por su ID público' })
  @ApiParam({
    name: 'publicId',
    description: 'Identificador público del archivo en Cloudinary',
  })
  @ApiResponse({
    status: 200,
    description: 'URL del archivo obtenida correctamente',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string' },
      },
    },
  })
  @Get(':publicId')
  getFileByPublicId(@Param('publicId') publicId: string) {
    const fileUrl = this.cloudinaryService.getFileUrl(publicId);
    return { url: fileUrl };
  }

  @ApiOperation({ summary: 'Verificar estado del servicio de archivos' })
  @ApiResponse({
    status: 200,
    description: 'Estado del servicio',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
      },
    },
  })
  @Get()
  getStatus() {
    return { status: 'Files service running' };
  }
}
