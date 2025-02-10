import {
  Controller,
  Delete,
  Body,
  Get,
  Post,
  Patch,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import CurrentUser from 'src/decorators/current-user.decorator';
import { SafeUser } from 'src/types.d';
import { Roles } from 'src/decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';
import { Post as IPost } from '@prisma/client';

@Controller('posts')
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

  @Roles('COMMUNITY_ADMIN', 'COMMUNITY_CREATOR')
  @Post('/')
  async createPost(
    @Body() body: CreatePostDto,
    @CurrentUser() author: SafeUser,
  ) {
    return await this.postsService.createPost(author, body);
  }

  @Patch('/:id')
  async updatePost() {
    return this.postsService.updatePost();
  }

  @Delete('/:id')
  async deletePost() {
    return this.postsService.deletePost();
  }
}
