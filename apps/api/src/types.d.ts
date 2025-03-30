type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface SafeUser extends Omit<User, 'password'> {}

export type NotNullRec<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export interface AccessTokenPayload {
  id: string;
  username: string;
}

export interface RefreshTokenPayload extends AccessTokenPayload {}

export interface SessionPayload extends Tokens {
  user: TokenUser;
}

export interface TokenUser
  extends Pick<SafeUser, 'id' | 'username' | 'email' | 'name' | 'role'> {}

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
