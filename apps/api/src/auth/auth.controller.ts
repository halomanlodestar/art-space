import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() credentials: SignInDto) {
    this.authService.signIn(credentials);
  }

  @Post('/signup')
  async signUp(@Body() credentials: SignUpDto) {
    this.authService.signUp(credentials);
  }

  @Post('/signout')
  async signOut() {
    this.authService.signOut();
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
