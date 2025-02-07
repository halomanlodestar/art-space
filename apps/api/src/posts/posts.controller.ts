import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  async getPosts() {
    this.postsService.getPosts();
  }

  @Get('/:id')
  async getPost(@Param('id') id: string) {
    this.postsService.getPost(id);
  }

  @UseGuards()
  @Post('/')
  async createPost(@Body() body: CreatePostDto) {}

  @Patch('/:id')
  async updatePost() {
    this.postsService.updatePost();
  }

  @Delete('/:id')
  async deletePost() {
    this.postsService.deletePost();
  }
}
