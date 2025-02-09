import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import argon from 'argon2';
import { Tokens } from 'src/types';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/configs/auth.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersSerice: UsersService,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly configService: ConfigType<typeof authConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, username } = signUpDto;

    const isEmailTaken = await this.usersSerice.findByEmail(email)!!;
    const isUsernameTaken = await this.usersSerice.findByUsername(username)!!;

    if (isEmailTaken) {
      throw new ConflictException('Email is already taken');
    }

    if (isUsernameTaken) {
      throw new ConflictException('Username is already taken');
    }

    await this.usersSerice.create(signUpDto);
  }

  async signIn(user: User): Promise<Tokens> {
    const { id, username } = user;

    const refreshToken = await this.jwtService.signAsync(
      { id, username },
      {
        secret: this.configService.refreshTokenSecret,
        expiresIn: this.configService.refreshTokenExpiresIn,
      },
    );

    const accessToken = await this.jwtService.signAsync(
      { id, username },
      {
        secret: this.configService.accessTokenSecret,
        expiresIn: this.configService.accessTokenExpiresIn,
      },
    );

    return { refreshToken, accessToken };
  }

  async refreshAccessToken() {}

  async validateLocalUser(email: string, password: string) {
    const user = await this.usersSerice.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await argon.verify(user.password, password);

    console.log(user.password, password, isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Pass');
    }

    return user;
  }
}
