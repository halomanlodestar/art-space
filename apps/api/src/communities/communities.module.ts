import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CommunitiesRepository } from 'src/repositories/communities.repository';
import { PostsModule } from '../posts/posts.module';
import { PostsService } from '../posts/posts.service';

@Module({
  imports: [AuthModule, PostsModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunitiesRepository, PostsService],
})
export class CommunitiesModule {}
