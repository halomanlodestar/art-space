import { Role, User } from '@prisma/client';

export interface SafeUser extends Omit<User, 'password'> {}

export interface TokenUser
  extends Pick<User, 'id' | 'email' | 'name' | 'username'> {}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Session extends Tokens {
  user: TokenUser;
}

export interface AuthJwtPayload {
  sub: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenUser;
    }
  }
}
