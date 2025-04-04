import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/decorators/api-response-type.decorator';
import { SignInDto, SignInResponseDto } from './dto/sign-in.dto';
import { RefreshResponseDto } from './dto/refresh.dto';
import { SafeUser } from '@art-space/shared/types';
import { SafeUserDto } from 'src/users/dto/safe-user.dto';
import { ApiAuth } from '../decorators/auth-header.decorator';

@ApiTags('auth')
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
  @ApiResponseType(SignInResponseDto)
  async signIn(@CurrentUser() user: SafeUser, @Body() _signInDto: SignInDto) {
    return await this.authService.signIn(user);
  }

  @Public()
  @Get('signin/google')
  @UseGuards(GoogleAuthGuard)
  async signInWithGoogle(@CurrentUser() user: SafeUser, @Res() res: Response) {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@CurrentUser() user: SafeUser, @Res() res: Response) {
    const {
      refreshToken,
      accessToken,
      user: signInUser,
    } = await this.authService.signIn(user);

    res.redirect(
      `http://localhost:3000/api/auth/google/callback?access_token=${accessToken}&refresh_token=${refreshToken}&user=${JSON.stringify(signInUser)}`,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiAuth()
  @ApiResponseType(SafeUserDto)
  async getCurrentUser(@CurrentUser() user: SafeUser) {
    return user;
  }

  @Public()
  @Post('refresh')
  @UseGuards(RefreshGuard)
  @ApiAuth()
  @ApiResponseType(RefreshResponseDto)
  async refreshAccessToken(@CurrentUser() user: SafeUser) {
    return this.authService.refreshAccessToken(user);
  }
}
