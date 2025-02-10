import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { SafeUser } from 'src/types';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { generateSlug } from 'src/lib/slug';

@Injectable()
export class CommunitiesService {
  constructor(private readonly db: PrismaService) {}

  async create(createCommunityDto: CreateCommunityDto, creator: SafeUser) {
    const { id: creatorId, role } = creator;

    if (!creatorId) {
      throw new Error('Unauthorized');
    }

    if (role !== 'COMMUNITY_ADMIN') {
      throw new Error('You must be an admin to perform this action');
    }

    try {
      return await this.db.community.create({
        data: {
          banner: '',
          slug: generateSlug(createCommunityDto.name, false),
          description: createCommunityDto.description,
          name: createCommunityDto.name,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException('Community already exists');
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    return await this.db.community.findMany();
  }

  async findOne(id: string) {
    const community = await this.db.community.findUnique({
      where: { id },
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
