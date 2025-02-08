import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionAndTokensModule } from 'src/session-and-tokens/session-and-tokens.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import refreshConfig from 'src/config/refresh.config';
import { RefreshStrategy } from './strategies/refresh-token-strategy';

@Module({
  imports: [
    SessionAndTokensModule,
    ConfigModule.forFeature(authConfig),
    ConfigModule.forFeature(refreshConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
  ],
})
export class AuthModule {}
