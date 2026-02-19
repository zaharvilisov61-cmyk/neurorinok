import { Controller, Get } from '@nestjs/common'
import { StatsService } from './stats.service'

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('social-proof')
  getSocialProof() {
    return {
      success: true,
      data: this.statsService.getSocialProof(),
    }
  }
}
