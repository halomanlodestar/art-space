import { Controller, Post, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import CurrentUser from 'src/decorators/current-user.decorator';
import { SafeUser } from 'src/types.d';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/decorators/api-response-type.decorator';
import { LikeEntity } from './entities/like.entity';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiResponseType(LikeEntity)
  async likePost(
    @Param('postId') postId: string,
    @CurrentUser() user: SafeUser,
  ) {
    return this.likesService.like(user.id, postId);
  }

  @Post()
  @ApiResponseType(LikeEntity)
  async unlikePost(
    @Param('postId') postId: string,
    @CurrentUser() user: SafeUser,
  ) {
    return this.likesService.unlike(user.id, postId);
  }
}
