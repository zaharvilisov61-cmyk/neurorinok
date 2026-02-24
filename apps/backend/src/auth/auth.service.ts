import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

export interface User {
  id: string
  name: string
  email: string
  username: string
  passwordHash: string
  avatar?: string
  role: 'user' | 'seller' | 'admin'
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  user: Omit<User, 'passwordHash'>
}

@Injectable()
export class AuthService {
  // In-memory user store (replace with DB later)
  private users: User[] = [
    {
      id: 'demo-1',
      name: 'Demo User',
      email: 'demo@example.com',
      username: 'demouser',
      passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'user',
      createdAt: new Date().toISOString(),
    },
  ]

  constructor(private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const exists = this.users.find(u => u.email === dto.email)
    if (exists) {
      throw new ConflictException('Email already in use')
    }

    const passwordHash = await bcrypt.hash(dto.password, 10)
    const username = dto.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000)

    const user: User = {
      id: `user-${Date.now()}`,
      name: dto.name,
      email: dto.email,
      username,
      passwordHash,
      role: 'user',
      createdAt: new Date().toISOString(),
    }

    this.users.push(user)

    const { passwordHash: _, ...userWithoutPassword } = user
    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email })

    return { accessToken, user: userWithoutPassword }
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = this.users.find(u => u.email === dto.email)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash)
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const { passwordHash: _, ...userWithoutPassword } = user
    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email })

    return { accessToken, user: userWithoutPassword }
  }

  async getMe(userId: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = this.users.find(u => u.id === userId)
    if (!user) return null
    const { passwordHash: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}
