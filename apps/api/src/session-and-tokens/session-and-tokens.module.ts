import { Module } from '@nestjs/common';
import { SessionAndTokensService } from './session-and-tokens.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import refreshConfig from 'src/config/refresh.config';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    ConfigModule.forFeature(refreshConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
  providers: [SessionAndTokensService],
  exports: [SessionAndTokensService],
})
export class SessionAndTokensModule {}
