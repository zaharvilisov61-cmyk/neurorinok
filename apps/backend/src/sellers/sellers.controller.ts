import { Controller, Get, Param, NotFoundException } from '@nestjs/common'
import { SellersService } from './sellers.service'

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get(':username')
  getProfile(@Param('username') username: string) {
    const profile = this.sellersService.getProfile(username)

    if (!profile) {
      throw new NotFoundException(`Seller @${username} not found`)
    }

    return {
      success: true,
      data: profile,
    }
  }

  @Get(':username/prompts')
  getPrompts(@Param('username') username: string) {
    const prompts = this.sellersService.getPrompts(username)

    return {
      success: true,
      data: prompts,
      meta: { total: prompts.length },
    }
  }
}
