import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v2 as cloudinary } from 'cloudinary'
import * as streamifier from 'streamifier'

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
}

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    })
  }

  async uploadImage(
    file: Express.Multer.File,
    options?: {
      folder?: string
      tags?: string[]
    },
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options?.folder || 'prompts',
          tags: options?.tags || [],
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as CloudinaryUploadResult)
        },
      )
      streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })
  }

  async uploadMultiple(
    files: Express.Multer.File[],
    options?: {
      folder?: string
    },
  ): Promise<CloudinaryUploadResult[]> {
    return Promise.all(files.map((file) => this.uploadImage(file, options)))
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId)
  }
}
