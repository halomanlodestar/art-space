import { generateSlug } from 'src/lib/slug';
import { CreatePostDto } from 'src/posts/dto/create-posts.dto';
import { PrismaService } from 'src/prisma.service';
import { NotNullRec, SafeUser } from 'src/types.d';
import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@art-space/database';

@Injectable()
export class PostsRepository {
  constructor(private readonly db: PrismaService) {}

  async getAll(options?: Prisma.PostFindManyArgs) {
    return await this.db.post.findMany(options);
  }

  async getByCommunityId(
    communityId: string,
    options?: Prisma.PostFindManyArgs,
  ) {
    return await this.db.post.findMany({
      where: { communityId },
      ...options,
    });
  }

  async getById(
    id: string,
    options?: Omit<Prisma.PostFindUniqueArgs, 'where'>,
  ) {
    return await this.db.post.findUnique({ where: { id }, ...options });
  }

  async getByAuthorId(authorId: string, options?: Prisma.PostFindManyArgs) {
    return await this.db.post.findMany({
      where: { authorId },
      ...options,
    });
  }

  async getPost(id: string, options?: Prisma.PostFindUniqueArgs) {
    return await this.db.post.findUnique({ where: { id }, ...options });
  }

  async getBySlug(
    slug: string,
    options?: Omit<Prisma.PostFindUniqueArgs, 'where'>,
  ) {
    return await this.db.post.findUnique({ where: { slug }, ...options });
  }

  async getLikedPosts(id: string): Promise<Post[]> {
    return await this.db.post.findMany({
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

    return await this.db.post.create({
      data: {
        ...body,
        authorId,
        communityId,
        slug: generateSlug(body.title),
      },
    });
  }

  async delete(id: string) {
    return await this.db.post.delete({ where: { id } });
  }

  async update(id: string, data: Prisma.PostUpdateInput) {
    return await this.db.post.update({ where: { id }, data });
  }
}
