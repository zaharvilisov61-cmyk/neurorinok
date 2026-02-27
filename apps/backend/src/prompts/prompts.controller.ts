import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common'
import { PromptsService } from './prompts.service'

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  create(@Body() body: any) {
    const prompt = this.promptsService.create(body)
    return { success: true, data: prompt }
  }

  @Get('featured')
  getFeatured() {
    return {
      success: true,
      data: this.promptsService.getFeatured(),
    }
  }

  @Get('trending')
  getTrending() {
    return {
      success: true,
      data: this.promptsService.getTrending(),
    }
  }

  @Get()
  getAll(
    @Query('search') search?: string,
    @Query('platform') platform?: string,
    @Query('category') category?: string,
    @Query('sort') sort?: string
  ) {
    const prompts = this.promptsService.getAll({
      search,
      platform,
      category,
      sort,
    })

    return {
      success: true,
      data: prompts,
      meta: {
        total: prompts.length,
      },
    }
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    const prompt = this.promptsService.getBySlug(slug)

    if (!prompt) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Prompt not found',
        },
      }
    }

    return {
      success: true,
      data: prompt,
    }
  }
}
