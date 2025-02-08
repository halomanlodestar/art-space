import { Role, User } from '@prisma/client';

export interface SafeUser extends Omit<User, 'password'> {}

export interface TokenUser
  extends Pick<User, 'id' | 'email' | 'name' | 'username'> {}

declare global {
  namespace Express {
    interface Request {
      user?: TokenUser;
    }
  }
}
