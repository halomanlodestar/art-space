import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { CommunitiesModule } from './communities/communities.module';
import { CommentsModule } from './comments/comments.module';
import { SessionAndTokensModule } from './session-and-tokens/session-and-tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
    LikesModule,
    AuthModule,
    CommunitiesModule,
    CommentsModule,
    SessionAndTokensModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
