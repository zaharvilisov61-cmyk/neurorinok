import { Controller, Post, Get, Body, Headers, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto)
    return { success: true, data: result }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto)
    return { success: true, data: result }
  }

  @Get('me')
  async me(@Headers('authorization') auth: string) {
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided')
    }

    const token = auth.slice(7)
    let payload: { sub: string; email: string }

    try {
      payload = this.jwtService.verify(token)
    } catch {
      throw new UnauthorizedException('Invalid token')
    }

    const user = await this.authService.getMe(payload.sub)
    if (!user) throw new UnauthorizedException('User not found')

    return { success: true, data: user }
  }
}
