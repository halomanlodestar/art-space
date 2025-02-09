import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from 'src/configs/auth.config';
import { AccessTokenPayload } from 'src/types';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(authConfig.KEY)
    configService: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.accessTokenSecret!,
    });
  }

  async validate(payload: AccessTokenPayload) {
    return this.authService.validateJwtUser(payload);
  }
}
