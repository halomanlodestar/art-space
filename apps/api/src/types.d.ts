import { Role, User } from '@prisma/client';

export interface SafeUser extends Omit<User, 'password'> {}

export interface TokenUser
  extends Pick<User, 'id' | 'email' | 'name' | 'username'> {}

export interface Session {
  user: TokenUser;
  // accessToken: string;
  // refreshToken: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenUser;
    }
  }
}
