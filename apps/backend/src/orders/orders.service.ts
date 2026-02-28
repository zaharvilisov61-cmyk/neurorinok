import { Injectable } from '@nestjs/common'

export interface OrderItem {
  promptId: string
  slug: string
  title: string
  thumbnail: string
  platform: string
  price: number
  authorName: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'paid' | 'failed'
  paymentMethod?: string
  createdAt: string
}

@Injectable()
export class OrdersService {
  private orders: Order[] = []

  async createOrder(userId: string, items: OrderItem[], paymentMethod?: string): Promise<Order> {
    const total = items.reduce((sum, item) => sum + item.price, 0)
    const order: Order = {
      id: Math.random().toString(36).slice(2),
      userId,
      items,
      total,
      status: 'pending',
      paymentMethod,
      createdAt: new Date().toISOString(),
    }
    this.orders.push(order)
    return order
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orders.filter((o) => o.userId === userId)
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.find((o) => o.id === id)
  }

  async updateStatus(id: string, status: Order['status']): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === id)
    if (!order) return null
    order.status = status
    return order
  }
}
