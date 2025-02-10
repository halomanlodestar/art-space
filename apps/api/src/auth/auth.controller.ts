import { Body, Get, Post, Res, UseGuards, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { SafeUser } from 'src/types.d';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@CurrentUser() user: User) {
    const tokens = await this.authService.signIn(user);

    return tokens;
  }

  @Public()
  @Get('signin/google')
  @UseGuards(GoogleAuthGuard)
  async signInWithGoogle(@CurrentUser() user: User, @Res() res: Response) {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@CurrentUser() user: User) {
    return await this.authService.signIn(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: SafeUser) {
    return user;
  }

  @Public()
  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@CurrentUser() user: User) {
    return this.authService.refreshAccessToken(user);
  }
}
