import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PromptsModule } from './prompts/prompts.module'
import { StatsModule } from './stats/stats.module'
import { UploadModule } from './upload/upload.module'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PromptsModule,
    StatsModule,
    UploadModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
