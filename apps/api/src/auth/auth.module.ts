import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, LocalStrategy],
})
export class AuthModule {}
