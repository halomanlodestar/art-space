import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CommunitiesRepository } from 'src/repositories/communities.repository';

@Module({
  imports: [AuthModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunitiesRepository],
})
export class CommunitiesModule {}
