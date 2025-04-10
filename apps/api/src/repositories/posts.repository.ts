import { generateSlug } from 'src/lib/slug';
import { CreatePostDto } from 'src/posts/dto/create-posts.dto';
import { NotNullRec, SafeUser } from 'src/types.d';
import { Injectable } from '@nestjs/common';
import { Post, Prisma, PrismaService } from '@art-space/database';

@Injectable()
export class PostsRepository {
  constructor(private readonly db: PrismaService) {}

  async getAll(options?: Prisma.PostFindManyArgs) {
    return this.db.post.findMany(options);
  }

  async getByCommunityId(
    communityId: string,
    options?: Prisma.PostFindManyArgs,
  ) {
    return this.db.post.findMany({
      where: { communityId },
      ...options,
    });
  }

  async getById(
    id: string,
    options?: Omit<Prisma.PostFindUniqueArgs, 'where'>,
  ) {
    return this.db.post.findUnique({ where: { id }, ...options });
  }
  async getBySlug(
    slug: string,
    options?: Omit<Prisma.PostFindUniqueArgs, 'where'>,
  ) {
    return this.db.post.findUnique({ where: { slug }, ...options });
  }

  async getLikedPosts(id: string): Promise<Post[]> {
    return this.db.post.findMany({
      where: {
        likes: {
          some: {
            userId: id,
          },
        },
      },
    });
  }

  async create(author: SafeUser, body: CreatePostDto) {
    const { id: authorId, communityId } = author as NotNullRec<SafeUser>;

    return this.db.post.create({
      data: {
        ...body,
        authorId,
        communityId,
        slug: generateSlug(body.title),
      },
    });
  }

  async delete(id: string) {
    return this.db.post.delete({ where: { id } });
  }

  async update(id: string, data: Prisma.PostUpdateInput) {
    return this.db.post.update({ where: { id }, data });
  }
}
