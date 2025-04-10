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
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import CurrentUser from 'src/decorators/current-user.decorator';
import { SafeUser } from 'src/types.d';
import { Roles } from 'src/decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';
import { Post as IPost } from '@art-space/database';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/decorators/api-response-type.decorator';
import { PostEntity } from './entities/post.entity';
import { CommentsService } from '../comments/comments.service';
import { CommentEntity } from '../comments/comment.entity';

@ApiTags('posts')
@Controller('posts')
@UseFilters(HttpExceptionFilter)
@CacheTTL(5000)
@UseInterceptors(CacheInterceptor)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Public()
  @Get('/')
  @ApiResponseType(PostEntity, true)
  async getAllPosts(): Promise<IPost[]> {
    return this.postsService.getPosts();
  }

  // @Public()
  // @Get(':slug')
  // @ApiResponseType(PostEntity)
  // async findPostBySlug(@Param('slug') slug: string): Promise<IPost | null> {
  //   return await this.postsService.getPostBySlug(slug);
  // }

  @Public()
  @Get('/:slug')
  @ApiResponseType(PostEntity)
  async getPostBySlug(@Param('slug') slug: string): Promise<IPost> {
    return await this.postsService.getPostBySlug(slug);
  }

  @Public()
  @Get('latest')
  @ApiResponseType(PostEntity, true)
  async fetchLatestPosts(
    @Query('skip', {
      transform: (value) => parseInt(value),
    })
    skip?: number,
    @Query('take', {
      transform: (value) => parseInt(value),
    })
    take?: number,
  ): Promise<IPost[]> {
    return await this.postsService.getLatestPosts(skip, take);
  }

  @Get('/liked')
  @ApiResponseType(PostEntity, true)
  async getUserLikedPosts(@CurrentUser() user: SafeUser): Promise<IPost[]> {
    return await this.postsService.getLikedPosts(user.id);
  }

  @Roles('COMMUNITY_CREATOR')
  @Post('/')
  @ApiResponseType(PostEntity)
  async createNewPost(
    @Body() body: CreatePostDto,
    @CurrentUser() author: SafeUser,
  ) {
    return await this.postsService.createPost(author, body);
  }

  @Roles('COMMUNITY_CREATOR')
  @Patch(':id')
  @ApiResponseType(PostEntity)
  async updatePost(
    @Param('id') id: string,
    @Body() body: UpdatePostsDto,
    @CurrentUser() author: SafeUser,
  ) {
    return this.postsService.updatePost(id, body, author.id);
  }

  @Roles('COMMUNITY_CREATOR')
  @Delete(':id')
  @ApiResponseType(PostEntity)
  async deletePost(@Param('id') id: string, @CurrentUser() author: SafeUser) {
    return this.postsService.deletePost(id, author.id);
  }

  @Public()
  @Get('/:id/comments')
  @ApiResponseType(CommentEntity, true)
  async getPostComments(@Param('id') id: string) {
    return await this.commentsService.getCommentsByPostId(id);
  }

  @Post(':id/comments')
  @ApiResponseType(CommentEntity)
  async createComment(
    @Param('id') id: string,
    @Body('content') content: string,
    @CurrentUser() user: SafeUser,
  ) {
    return await this.commentsService.createComment(id, content, user.id);
  }
}
