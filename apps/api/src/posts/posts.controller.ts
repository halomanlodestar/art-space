import {
  Controller,
  Delete,
  Body,
  Get,
  Post,
  Patch,
  Param,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import CurrentUser from 'src/decorators/current-user.decorator';
import { SafeUser } from 'src/types.d';
import { Roles } from 'src/decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';
import { Post as IPost, Role } from '@prisma/client';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Controller('posts')
@UseFilters(HttpExceptionFilter)
@CacheTTL(5000)
@UseInterceptors(CacheInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get('/')
  async getPosts(): Promise<IPost[]> {
    return await this.postsService.getPosts();
  }

  @Public()
  @Get('/:slug')
  async getPostBySlug(@Param('slug') slug: string): Promise<IPost | null> {
    return await this.postsService.getPostBySlug(slug);
  }

  @Public()
  @Get('/:id')
  async getPostsByCommunityId(@Param('id') id: string): Promise<IPost[]> {
    return await this.postsService.getPostsByCommunityId(id);
  }

  @Roles('COMMUNITY_CREATOR')
  @Post('/')
  async createPost(
    @Body() body: CreatePostDto,
    @CurrentUser() author: SafeUser,
  ) {
    return await this.postsService.createPost(author, body);
  }

  @Roles('COMMUNITY_CREATOR')
  @Patch('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() body: UpdatePostsDto,
    @CurrentUser() author: SafeUser,
  ) {
    return this.postsService.updatePost(id, body, author.id);
  }

  @Roles('COMMUNITY_CREATOR')
  @Delete('/:id')
  async deletePost(@Param('id') id: string, @CurrentUser() author: SafeUser) {
    return this.postsService.deletePost(id, author.id);
  }
}
