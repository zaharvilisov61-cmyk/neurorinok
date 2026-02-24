import { Module } from '@nestjs/common'
import { SellersController } from './sellers.controller'
import { SellersService } from './sellers.service'
import { PromptsModule } from '../prompts/prompts.module'

@Module({
  imports: [PromptsModule],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
