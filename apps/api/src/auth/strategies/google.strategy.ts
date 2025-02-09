import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import googleOauthConfig from 'src/configs/google-oauth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    config: ConfigType<typeof googleOauthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.clientId!,
      clientSecret: config.clientSecret!,
      callbackURL: config.callbackURL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ) {
    const { emails, displayName, _json } = profile;

    const userData = {
      id: _json.sub,
      email: emails![0].value,
      image: _json.picture!,
      name: displayName,
      username: emails![0].value.split('@').join('').split('.').join(''),
      password: 'authenticating with google',
    };

    console.log(userData);

    const user = await this.authService.signInWithGoogle(userData);
    done(null, user);
  }
}
