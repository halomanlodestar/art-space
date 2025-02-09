import {
  Body,
  Get,
  Post,
  Res,
  UseGuards,
  Controller,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import { MONTH } from 'src/lib/constants';
import { LocalAuthGuard } from './guards/local-auth.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshGuard } from './guards/refresh.guard';
import DeviceType from 'src/decorators/device-type.decorator';
import { omit } from 'src/lib/utils';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
    @DeviceType() deviceType: string,
  ) {
    const tokens = await this.authService.signIn(user);

    if (deviceType === 'phone') {
      return tokens;
    }

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: MONTH,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return { accessToken: tokens.accessToken };
  }

  @Get('signin/google')
  @UseGuards(GoogleAuthGuard)
  async signInWithGoogle(@CurrentUser() user: User, @Res() res: Response) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@CurrentUser() user: User) {
    return await this.authService.signIn(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async protected(@CurrentUser() user: User) {
    return omit(user, ['password']);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@CurrentUser() user: User) {
    return this.authService.refreshAccessToken(user);
  }
}
