import { Body, Get, Post, Res, UseGuards, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { SafeUser } from 'src/types.d';
import { Public } from 'src/decorators/public.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/decorators/api-response-type.decorator';
import { SignInResponseDto } from './dto/sign-in.dto';
import { MeResponseDto } from './dto/me.dto';
import { RefreshResponseDto } from './dto/refresh.dto';
import { User } from '@art-space/database';

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
  @ApiResponseType(MeResponseDto)
  async getCurrentUser(@CurrentUser() user: SafeUser) {
    return user;
  }

  @Public()
  @Post('refresh')
  @UseGuards(RefreshGuard)
  @ApiResponseType(RefreshResponseDto)
  async refreshAccessToken(@CurrentUser() user: User) {
    return this.authService.refreshAccessToken(user);
  }
}
