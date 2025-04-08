import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          (
            error: UploadApiErrorResponse | null,
            result: UploadApiResponse | undefined,
          ) => {
            if (error) {
              reject(new Error(`Cloudinary upload failed: ${error.message}`));
            } else if (result) {
              resolve(result);
            } else {
              reject(
                new Error('Unknown error occurred during Cloudinary upload'),
              );
            }
          },
        )
        .end(file.buffer);
    });
  }

  getFileUrl(publicId: string, options?: Record<string, any>): string {
    return cloudinary.url(publicId, options);
  }
}
