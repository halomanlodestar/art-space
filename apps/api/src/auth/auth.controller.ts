import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard.ts/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() credentials: SignUpDto) {
    console.log(credentials);
    return await this.authService.signUp(credentials);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Req() req: Request) {
    return req.user;
  }

  @Post('/signout')
  async signOut() {
    return this.authService.signOut();
  }

  @Post('/refresh')
  async refresh() {
    this.authService.refresh();
  }

  @Post('/forgot-password')
  async forgotPassword() {
    this.authService.forgotPassword();
  }

  @Post('/reset-password')
  async resetPassword() {
    this.authService.resetPassword();
  }
}
