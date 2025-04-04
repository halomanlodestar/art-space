import { generateSlug } from 'src/lib/slug';
import { CreateCommunityDto } from 'src/communities/dto/create-community.dto';
import { NotNullRec, SafeUser } from 'src/types.d';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@art-space/database';

@Injectable()
export class CommunitiesRepository {
  constructor(private readonly db: PrismaService) {}

  async getAll(options?: Prisma.CommunityFindManyArgs) {
    const communities = await this.db.community.findMany(options);

    console.log(communities);
    return communities;
  }

  async getById(id: string, options?: Prisma.CommunityFindUniqueArgs) {
    return this.db.community.findUnique({ where: { id }, ...options });
  }

  async getBySlug(slug: string, options?: Prisma.CommunityFindUniqueArgs) {
    return this.db.community.findUnique({ where: { slug }, ...options });
  }

  async create(author: SafeUser, body: CreateCommunityDto) {
    const { id: authorId } = author;

    return this.db.community.create({
      data: {
        createdById: authorId,
        banner: '',
        name: body.name,
        description: body.description,
        slug: generateSlug(body.name),
      },
    });
  }

  async update(id: string, data: NotNullRec<Prisma.CommunityUpdateInput>) {
    return this.db.community.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.db.community.delete({ where: { id } });
  }

  async search(search: string) {
    return this.db.community.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }
}
