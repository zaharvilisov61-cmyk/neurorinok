import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHealthCheck() {
    return {
      success: true,
      message: 'PromptBase API is running',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        prompts: {
          featured: 'GET /prompts/featured',
          trending: 'GET /prompts/trending',
          all: 'GET /prompts',
          bySlug: 'GET /prompts/:slug',
        },
        stats: {
          socialProof: 'GET /stats/social-proof',
        },
        upload: {
          single: 'POST /upload/image',
          multiple: 'POST /upload/images',
        },
      },
    }
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }
  }
}
