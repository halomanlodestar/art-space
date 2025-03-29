import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsRepository } from '../repositories/comments.repository';

@Module({
  imports: [],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService],
})
export class CommentsModule {}
