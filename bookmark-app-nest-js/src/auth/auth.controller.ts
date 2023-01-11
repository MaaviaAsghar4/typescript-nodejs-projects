import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}
