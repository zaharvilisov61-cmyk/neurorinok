import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'
import { CloudinaryService } from './cloudinary.service'

@Module({
  imports: [
    MulterModule.register({
      storage: require('multer').memoryStorage(),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService],
  exports: [UploadService, CloudinaryService],
})
export class UploadModule {}
