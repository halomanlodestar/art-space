import { Role, User } from '@prisma/client';
import { Profile } from 'passport-google-oauth20';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface SafeUser extends Omit<User, 'password'> {}

export interface AccessTokenPayload {
  id: string;
  username: string;
}

export interface RefreshTokenPayload extends AccessTokenPayload {}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenUser;
    }
  }
}
