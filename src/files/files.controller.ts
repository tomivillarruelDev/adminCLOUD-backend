import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFilters } from './helpers/file-filter.helper';
import { CloudinaryService } from './cloudinary.service';

@Controller('files')
export class FilesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileFilters.ALL,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
    return result;
  }

  @Get(':publicId')
  getFile(@Param('publicId') publicId: string) {
    const fileUrl = this.cloudinaryService.getFileUrl(publicId);
    return { url: fileUrl };
  }
}
