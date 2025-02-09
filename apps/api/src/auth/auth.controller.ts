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
import { MONTH } from 'src/lib/constants';
import { LocalAuthGuard } from './guards/local-auth.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import { User } from '@prisma/client';

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
  ) {
    const tokens = await this.authService.signIn(user);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: MONTH,
      httpOnly: true,
    });

    return tokens;
  }
}
