import { Tokens } from 'src/types.d';

export class SignInDto {
  email: string;
  password: string;
}

export class SignInResponseDto implements Tokens {
  accessToken: string;
  refreshToken: string;
}
