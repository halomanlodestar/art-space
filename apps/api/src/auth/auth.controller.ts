import {
  Body,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MONTH } from 'src/lib/constants';

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
  async signIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { user } = req;
    const session = await this.authService.createSession({ user: user! });
    const expires = new Date(Date.now() + MONTH);
    res.cookie('session', session, {
      expires,
    });
  }

  @Get('/session')
  async session(@Req() req: Request) {
    const { session } = req.cookies;

    if (!session) {
      throw new UnauthorizedException('No session found');
    }

    return this.authService.getSession(session).user;
  }

  @Post('/signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('session');
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
