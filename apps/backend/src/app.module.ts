import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PromptsModule } from './prompts/prompts.module'
import { StatsModule } from './stats/stats.module'
import { UploadModule } from './upload/upload.module'
import { SellersModule } from './sellers/sellers.module'
import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PromptsModule,
    StatsModule,
    UploadModule,
    SellersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
