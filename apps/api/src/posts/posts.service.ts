import { PostsRepository } from './../repositories/posts.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { SafeUser } from 'src/types';
import { generateSlug } from 'src/lib/slug';
import { ForbiddenError, NotFoundError } from 'src/errors/InternalError';
import { Post, Prisma } from '@prisma/client';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getPosts() {
    return await this.postsRepository.getAll();
  }

  async getPostById(id: string) {
    return await this.postsRepository.getById(id);
  }

  async getPostBySlug(slug: string) {
    const post = await this.postsRepository.getBySlug(slug);

    if (!post) throw new NotFoundError('Post not found');

    return post;
  }

  async getPostsByCommunityId(id: string): Promise<Post[]> {
    return await this.postsRepository.getByCommunityId(id);
  }

  async createPost(author: SafeUser, body: CreatePostDto) {
    const { communityId } = author;

    if (!communityId) {
      throw new ForbiddenError('You must be a member of a community to post');
    }

    return await this.postsRepository.create(author, {
      ...body,
    });
  }

  async deletePost(id: string, authorId: string) {
    const post = await this.postsRepository.getById(id);

    if (!post) throw new NotFoundError('Post not found');

    if (post.authorId !== authorId) {
      throw new ForbiddenError(
        'You do not have permission to delete this post',
      );
    }

    return this.postsRepository.delete(id);
  }

  async updatePost(id: string, data: UpdatePostsDto, authorId: string) {
    const post = await this.postsRepository.getById(id);

    if (!post) throw new NotFoundError('Post not found');

    if (post.authorId !== authorId) {
      throw new ForbiddenError(
        'You do not have permission to update this post',
      );
    }

    return this.postsRepository.update(id, data);
  }
}
