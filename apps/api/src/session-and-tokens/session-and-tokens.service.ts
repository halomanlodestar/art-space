import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import refreshConfig from 'src/config/refresh.config';
import { AuthJwtPayload, Session, Tokens } from 'src/types';

@Injectable()
export class SessionAndTokensService {
  constructor(
    private jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private config: ConfigType<typeof refreshConfig>,
  ) {}

  async createSession(payload: Session) {
    return await this.jwtService.signAsync(payload);
  }

  async getSession(session: string) {
    try {
      return await this.jwtService.verifyAsync<Session>(session);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid session');
      }

      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async createTokens(userId: string): Promise<Tokens> {
    const payload: AuthJwtPayload = {
      sub: userId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.config),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async extractJwt(req: Request): Promise<string | null> {
    const { session } = req.cookies;

    if (!session) throw new UnauthorizedException('Not logged in');

    const { refreshToken } = await this.getSession(session);

    return refreshToken;
  }
}
