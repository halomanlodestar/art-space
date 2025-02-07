import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommunityModule } from './community/community.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
    CommunityModule,
    LikesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
