import { ConflictException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly usersSerice: UsersService,
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

  signOut() {
    throw new Error('Method not implemented.');
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
}
