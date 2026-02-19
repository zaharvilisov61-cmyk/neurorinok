import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CloudinaryService } from './cloudinary.service'
import { UploadResponseDto } from './dto/upload-response.dto'

@Injectable()
export class UploadService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private configService: ConfigService,
  ) {}

  async uploadSingle(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<UploadResponseDto> {
    const result = await this.cloudinaryService.uploadImage(file, { folder })

    return {
      id: result.public_id,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
      thumbnailUrl: this.getThumbnailUrl(result.public_id),
    }
  }

  async uploadMultiple(
    files: Express.Multer.File[],
    folder?: string,
  ): Promise<UploadResponseDto[]> {
    const results = await this.cloudinaryService.uploadMultiple(files, {
      folder,
    })
    return results.map((result) => ({
      id: result.public_id,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
      thumbnailUrl: this.getThumbnailUrl(result.public_id),
    }))
  }

  private getThumbnailUrl(publicId: string): string {
    const cloudName = this.configService.get('CLOUDINARY_CLOUD_NAME')
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_280,h_187,c_fill,q_auto,f_webp/${publicId}`
  }
}
