import { Controller, Post, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import CurrentUser from 'src/decorators/current-user.decorator';
import { SafeUser } from 'src/types.d';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  likePost(@Param('postId') postId: string, @CurrentUser() user: SafeUser) {
    return this.likesService.like(user.id, postId);
  }

  @Post()
  unlikePost(@Param('postId') postId: string, @CurrentUser() user: SafeUser) {
    return this.likesService.unlike(user.id, postId);
  }
}
