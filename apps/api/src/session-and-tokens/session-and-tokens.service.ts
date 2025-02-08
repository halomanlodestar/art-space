import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { AuthJwtPayload, Session, Tokens } from 'src/types';

@Injectable()
export class SessionAndTokensService {
  constructor(private jwtService: JwtService) {}

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

    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      // this.jwtService.signAsync(payload),
    ]);

    return {
      accessToken,
      refreshToken: '',
    };
  }
}
