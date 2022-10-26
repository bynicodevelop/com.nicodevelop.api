import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly autService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ data: { access_token: string } }> {
    const user = await this.autService.login(loginUserDto);

    return {
      data: {
        ...user,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Req() req) {
    return req.user;
  }
}
