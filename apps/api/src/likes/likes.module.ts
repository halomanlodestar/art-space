import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from 'src/repositories/likes.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikesRepository, PrismaService],
})
export class LikesModule {}
