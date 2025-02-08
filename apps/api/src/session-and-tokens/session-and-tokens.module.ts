import { Module } from '@nestjs/common';
import { SessionAndTokensService } from './session-and-tokens.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
  providers: [SessionAndTokensService],
  exports: [SessionAndTokensService],
})
export class SessionAndTokensModule {}
