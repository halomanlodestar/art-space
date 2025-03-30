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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/decorators/api-response-type.decorator';
import { SignInResponseDto } from './dto/sign-in.dto';
import { RefreshResponseDto } from './dto/refresh.dto';
import { SafeUser } from '@art-space/shared/types';
import { SafeUserDto } from 'src/users/dto/safe-user.dto';

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
  @ApiBody({
    type: SignUpDto,
  })
  @ApiResponseType(SignInResponseDto)
  async signIn(@CurrentUser() user: SafeUser) {
    return await this.authService.signIn(user);
  }

  @Public()
  @Get('signin/google')
  @UseGuards(GoogleAuthGuard)
  async signInWithGoogle(@CurrentUser() user: SafeUser, @Res() res: Response) {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@CurrentUser() user: SafeUser) {
    return await this.authService.signIn(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(SafeUserDto)
  async getCurrentUser(@CurrentUser() user: SafeUser) {
    return user;
  }

  @Public()
  @Post('refresh')
  @UseGuards(RefreshGuard)
  @ApiResponseType(RefreshResponseDto)
  async refreshAccessToken(@CurrentUser() user: SafeUser) {
    return this.authService.refreshAccessToken(user);
  }
}
