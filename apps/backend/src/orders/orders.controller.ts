import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  UnauthorizedException,
  Param,
  Patch,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OrdersService, OrderItem } from './orders.service'

interface CreateOrderDto {
  items: OrderItem[]
  paymentMethod?: string
}

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly jwtService: JwtService,
  ) {}

  private getUserId(auth: string): string {
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided')
    }
    const token = auth.slice(7)
    try {
      const payload = this.jwtService.verify<{ sub: string }>(token)
      return payload.sub
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }

  @Post()
  async createOrder(
    @Headers('authorization') auth: string,
    @Body() dto: CreateOrderDto,
  ) {
    const userId = this.getUserId(auth)
    const order = await this.ordersService.createOrder(userId, dto.items, dto.paymentMethod)
    return { success: true, data: order }
  }

  @Get()
  async getUserOrders(@Headers('authorization') auth: string) {
    const userId = this.getUserId(auth)
    const orders = await this.ordersService.getUserOrders(userId)
    return { success: true, data: orders }
  }

  @Get(':id')
  async getOrder(@Headers('authorization') auth: string, @Param('id') id: string) {
    this.getUserId(auth)
    const order = await this.ordersService.getOrder(id)
    return { success: true, data: order ?? null }
  }

  @Patch(':id/status')
  async updateStatus(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'paid' | 'failed',
  ) {
    this.getUserId(auth)
    const order = await this.ordersService.updateStatus(id, status)
    return { success: true, data: order }
  }
}
