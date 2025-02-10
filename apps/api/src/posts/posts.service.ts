import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { SafeUser } from 'src/types';
import { generateSlug } from 'src/lib/slug';
import { Role } from '@prisma/client';

@Injectable()
export class PostsService {
  private readonly createPostRoles: Role[] = [
    'COMMUNITY_CREATOR',
    'COMMUNITY_ADMIN',
  ];
  constructor(private readonly db: PrismaService) {}

  async getPosts() {
    return await this.db.post.findMany();
  }

  getPost(id: string) {
    return this.db.post.findUnique({ where: { id } });
  }

  async getPostBySlug(slug: string) {
    const post = await this.db.post.findUnique({ where: { slug } });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async createPost(author: SafeUser, body: CreatePostDto) {
    if (!author) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { id: authorId, communityId, role } = author;

    if (!communityId || !this.createPostRoles.includes(role)) {
      throw new UnauthorizedException(
        'You must be a creator to perform this action',
      );
    }

    return await this.db.post.create({
      data: {
        authorId,
        communityId,
        slug: generateSlug(body.title),
        ...body,
      },
    });
  }

  deletePost() {
    throw new Error('Method not implemented.');
  }
  updatePost() {
    throw new Error('Method not implemented.');
  }
}
