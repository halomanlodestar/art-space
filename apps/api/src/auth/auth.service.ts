import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';
import { TokenUser } from 'src/types';
import { SessionAndTokensService } from 'src/session-and-tokens/session-and-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly usersSerice: UsersService,
    private readonly sessionTokenService: SessionAndTokensService,
  ) {}

  async signUp(credentials: SignUpDto) {
    const { email, ...data } = credentials;

    const [emailTaken, usernameTaken] = await Promise.all([
      this.usersSerice.findByEmail(email),
      this.usersSerice.findByUsername(data.username),
    ]);

    if (emailTaken) {
      throw new ConflictException('Email is already taken');
    }

    if (usernameTaken) {
      throw new ConflictException('Username is already taken');
    }

    return this.usersSerice.create(credentials);
  }

  async validatLocaleUser(email: string, password: string): Promise<TokenUser> {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let passwordMatched = await verify(user.password, password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async signIn(user: TokenUser) {
    const { accessToken, refreshToken } =
      await this.sessionTokenService.createTokens(user.id);

    const session = this.sessionTokenService.createSession({
      user: user!,
      accessToken,
      refreshToken,
    });

    return session;
  }
}
