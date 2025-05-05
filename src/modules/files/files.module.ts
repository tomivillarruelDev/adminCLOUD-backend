import { Module } from '@nestjs/common';
import { FilesService } from './services/files.service';
import { FilesController } from './controllers/files.controller';
import { CloudinaryService } from './services/cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService],
  imports: [ConfigModule],
})
export class FilesModule {}
