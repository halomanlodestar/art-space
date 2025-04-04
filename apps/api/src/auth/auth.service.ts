import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import argon from 'argon2';
import { AccessTokenPayload, SessionPayload, TokenUser } from 'src/types';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/configs/auth.config';
import {
  AuthProviderError,
  EmailTakenError,
  InvalidCredentialsError,
  UsernameTakenError,
  UserNotFoundError,
} from 'src/errors/InternalError';
import { CredentialProvider, SafeUser } from '@art-space/shared/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly configService: ConfigType<typeof authConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, username } = signUpDto;

    const isEmailTaken = await this.usersService.findByEmail(email)!!;
    const isUsernameTaken = await this.usersService.findByUsername(username)!!;

    if (isEmailTaken) {
      throw new EmailTakenError();
    }

    if (isUsernameTaken) {
      throw new UsernameTakenError();
    }

    await this.usersService.create(signUpDto);
  }

  async signIn(user: SafeUser): Promise<SessionPayload> {
    const { id, username, email, name, role, image, communityId } = user;

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

    return {
      refreshToken,
      accessToken,
      user: { id, username, email, name, role, image, communityId },
    };
  }

  async refreshAccessToken(user: SafeUser): Promise<{ accessToken: string }> {
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
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    if (user.provider !== CredentialProvider.EMAIL) {
      throw new AuthProviderError();
    }

    return user;
  }

  async validateJwtUser(payload: AccessTokenPayload) {
    const { id } = payload;

    const user = await this.usersService.findById(id);

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

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      if (existingUser.provider !== CredentialProvider.GOOGLE) {
        throw new AuthProviderError();
      }

      return existingUser;
    }

    return this.usersService.create(user, 'GOOGLE');
  }

  async validateToken(authHeader: string) {
    const token = authHeader.split(' ')[1];

    try {
      const { id, username } = this.jwtService.verify<AccessTokenPayload>(
        token,
        {
          secret: this.configService.accessTokenSecret,
        },
      );

      return (await this.usersService.findById(id)) as TokenUser;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return undefined;
      }

      throw error;
    }
  }
}
