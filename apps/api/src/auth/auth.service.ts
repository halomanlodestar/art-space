import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';
import { Session, TokenUser } from 'src/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import authConfig from 'src/config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly usersSerice: UsersService,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigService<typeof authConfig>,
  ) {}

  signIn(credentials: SignInDto) {
    throw new Error('Method not implemented.');
  }

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

  refresh() {
    throw new Error('Method not implemented.');
  }

  forgotPassword() {
    throw new Error('Method not implemented.');
  }

  resetPassword() {
    throw new Error('Method not implemented.');
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

  createSession(payload: Session) {
    return this.jwtService.sign(payload, {
      secret: 'npm i -D @types/cookie-parser',
    });
  }

  getSession(session: string) {
    return this.jwtService.verify<Session>(session, {
      secret: 'npm i -D @types/cookie-parser',
    });
  }
}
