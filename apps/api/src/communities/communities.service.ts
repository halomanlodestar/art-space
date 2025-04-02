import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { SafeUser } from 'src/types.d';
import { CommunitiesRepository } from 'src/repositories/communities.repository';
import {Prisma} from "@art-space/database"
import {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  ConflictError,
} from '../errors/InternalError';

@Injectable()
export class CommunitiesService {
  constructor(private readonly communityRepository: CommunitiesRepository) {}

  async create(createCommunityDto: CreateCommunityDto, creator: SafeUser) {
    const { id: creatorId, role } = creator;

    if (!creatorId) {
      throw new UnauthorizedError('Unauthorized');
    }

    if (role !== 'COMMUNITY_ADMIN') {
      throw new ForbiddenError('You must be an admin to perform this action');
    }

    try {
      return await this.communityRepository.create(creator, createCommunityDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictError('Community already exists');
      }

      throw new InternalServerError(error.message);
    }
  }

  async findAll() {
    return await this.communityRepository.getAll();
  }

  async findOne(id: string) {
    const community = await this.communityRepository.getById(id);

    if (!community) {
      throw new NotFoundError('Community not found');
    }

    return community;
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto) {
    return await this.communityRepository.update(id, updateCommunityDto);
  }

  async remove(id: string) {
    return await this.communityRepository.delete(id);
  }
}
