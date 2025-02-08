import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';

@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    LocalStrategy,
    JwtService,
  ],
})
export class AuthModule {}
