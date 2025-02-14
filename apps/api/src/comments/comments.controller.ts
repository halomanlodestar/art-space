import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/decorators/api-response-type.decorator';
import { CommentEntity } from './entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiResponseType(CommentEntity)
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Public()
  @Get('/post/:id')
  @ApiResponseType(Array<CommentEntity>)
  async findCommentsByPostId(@Param('id') id: string) {
    return this.commentsService.findByPostId(id);
  }

  @Get(':id')
  @ApiResponseType(CommentEntity)
  async findCommentById(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponseType(CommentEntity)
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiResponseType(CommentEntity)
  async deleteComment(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
