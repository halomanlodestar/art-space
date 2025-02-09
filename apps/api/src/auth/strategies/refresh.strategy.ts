import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from 'src/configs/auth.config';
import { AccessTokenPayload } from 'src/types';
import { AuthService } from '../auth.service';
import { Request } from 'express';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly authService: AuthService,
    @Inject(authConfig.KEY)
    configService: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshStrategy.handleExtraction,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.refreshTokenSecret!,
    });
  }

  async validate(payload: AccessTokenPayload) {
    return this.authService.validateJwtUser(payload);
  }

  static handleExtraction(req: Request) {
    // Check device type, either web or mobile
    // If it's mobile, extract from Authorization header
    // If it's web, extract from cookie
    // If it's not present, return null
    const deviceType = req.headers['device-type'];

    if (deviceType === 'app') {
      return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    }

    let cookie = RefreshStrategy.extractFromCookie(req);

    return cookie;
  }

  static extractFromCookie(req: Request) {
    if (req && req.cookies) {
      return req.cookies['refreshToken'];
    }
  }
}
