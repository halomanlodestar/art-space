import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthModule } from 'src/auth/auth.module';
import { PostsRepository } from 'src/repositories/posts.repository';
import { CommentsModule } from '../comments/comments.module';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [AuthModule, CommentsModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
