import {
  Body,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Controller,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MONTH } from 'src/lib/constants';
import { SessionAndTokensService } from 'src/session-and-tokens/session-and-tokens.service';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionAndTokenService: SessionAndTokensService,
  ) {}

  @Post('/signup')
  async signUp(@Body() credentials: SignUpDto) {
    console.log(credentials);
    return await this.authService.signUp(credentials);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { user } = req;

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const expires = new Date(Date.now() + MONTH);
    const session = await this.authService.signIn(user);

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

    return await this.sessionAndTokenService.getSession(session);
  }

  @Post('/signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('session');
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    this.authService.refreshToken(req.user!);
  }
}
