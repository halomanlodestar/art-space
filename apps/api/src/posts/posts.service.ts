import { PostsRepository } from './../repositories/posts.repository';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-posts.dto';
import { SafeUser } from 'src/types.d';
import { ForbiddenError, NotFoundError } from 'src/errors/InternalError';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { Post } from '@art-space/database';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  private readonly postsListSelections = {
    slug: true,
    title: true,
    createdAt: true,
    description: true,
    media: true,
    author: {
      select: {
        name: true,
        image: true,
        username: true,
      },
    },
    community: {
      select: {
        name: true,
        slug: true,
      },
    },
  };

  async getPosts() {
    return await this.postsRepository.getAll({
      select: this.postsListSelections,
    });
  }

  async getPostById(id: string) {
    return await this.postsRepository.getById(id, {
      select: this.postsListSelections,
    });
  }

  async getPostBySlug(slug: string) {
    const post = await this.postsRepository.getBySlug(slug, {
      select: this.postsListSelections,
    });

    if (!post) throw new NotFoundError('Post not found');

    return post;
  }

  async getPostsByCommunityId(id: string): Promise<Post[]> {
    return await this.postsRepository.getByCommunityId(id, {
      select: this.postsListSelections,
    });
  }

  async getLikedPosts(id: string): Promise<Post[]> {
    return await this.postsRepository.getLikedPosts(id);
  }

  async getLatestPosts(skip = 0, take = 10): Promise<Post[]> {
    return await this.postsRepository.getAll({
      orderBy: { createdAt: 'desc' },
      select: this.postsListSelections,
      skip,
      take,
    });
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
