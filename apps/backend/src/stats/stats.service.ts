import { Injectable } from '@nestjs/common'

@Injectable()
export class StatsService {
  getSocialProof() {
    return {
      averageRating: 4.9,
      reviewCount: 33000,
      userCount: 400000,
      promptCount: 240000,
    }
  }
}
