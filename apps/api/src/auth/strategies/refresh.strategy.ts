import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from 'src/configs/auth.config';
import { AccessTokenPayload } from 'src/types.d';
import { AuthService } from '../auth.service';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly authService: AuthService,
    @Inject(authConfig.KEY)
    configService: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.refreshTokenSecret!,
    });
  }

  async validate(payload: AccessTokenPayload) {
    console.log('payload', payload);
    return this.authService.validateJwtUser(payload);
  }
}
