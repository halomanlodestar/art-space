import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import argon from 'argon2';
import { AccessTokenPayload, Tokens } from 'src/types';
import { SignUpDto } from './dto/sign-up.dto';
import { CredentialProvider, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/configs/auth.config';
import {
  EmailTakenError,
  UsernameTakenError,
  UserNotFoundError,
  InvalidPasswordError,
  AuthProviderError,
} from 'src/errors/InternalError';

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
      throw new EmailTakenError();
    }

    if (isUsernameTaken) {
      throw new UsernameTakenError();
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

  async refreshAccessToken(user: User) {
    const { id, username } = user;

    const accessToken = await this.jwtService.signAsync(
      { id, username },
      {
        secret: this.configService.accessTokenSecret,
        expiresIn: this.configService.accessTokenExpiresIn,
      },
    );

    return { accessToken };
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.usersSerice.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }

    if (user.provider !== CredentialProvider.EMAIL) {
      throw new AuthProviderError();
    }

    return user;
  }

  async validateJwtUser(payload: AccessTokenPayload) {
    const { id } = payload;

    const user = await this.usersSerice.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async signInWithGoogle(user: {
    id: string;
    email: string;
    image: string;
    name: string;
    username: string;
    password: string;
  }) {
    const { email } = user;

    const existingUser = await this.usersSerice.findByEmail(email);

    if (existingUser) {
      if (existingUser.provider !== CredentialProvider.GOOGLE) {
        throw new AuthProviderError();
      }

      return existingUser;
    }

    return this.usersSerice.create(user, 'GOOGLE');
  }
}
