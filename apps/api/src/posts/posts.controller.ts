import {
  Controller,
  Delete,
  Body,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import { SafeUser } from 'src/types.d';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get('/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    this.postsService.getPostBySlug(slug);
  }

  @Roles('COMMUNITY_ADMIN', 'COMMUNITY_CREATOR')
  @Post('/')
  async createPost(
    @Body() body: CreatePostDto,
    @CurrentUser() author: SafeUser,
  ) {
    return await this.postsService.createPost(author, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updatePost() {
    this.postsService.updatePost();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost() {
    this.postsService.deletePost();
  }
}
