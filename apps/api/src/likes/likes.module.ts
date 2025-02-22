import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from 'src/repositories/likes.repository';
@Module({
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
