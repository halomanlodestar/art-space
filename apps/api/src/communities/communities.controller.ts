import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import CurrentUser from 'src/decorators/current-user.decorator';
import { SafeUser } from 'src/types.d';
import { Roles } from 'src/decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/decorators/api-response-type.decorator';
import { CommunityEntity } from './entities/community.entity';
import { PostsService } from '../posts/posts.service';
import { PostEntity } from '../posts/entities/post.entity';

@ApiTags('communities')
@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly postsService: PostsService,
  ) {}

  @Roles('SUDO')
  @Post()
  @ApiResponseType(CommunityEntity)
  async createCommunity(
    @Body() createCommunityDto: CreateCommunityDto,
    @CurrentUser() creator: SafeUser,
  ) {
    return await this.communitiesService.create(createCommunityDto, creator);
  }

  @Public()
  @Get(':id/posts')
  @ApiResponseType(PostEntity, true)
  async getPostsByCommunity(@Param('id') id: string) {
    return await this.postsService.getPostsByCommunityId(id);
  }

  @Public()
  @Get('/')
  @ApiResponseType(CommunityEntity, true)
  async findAllCommunities() {
    return await this.communitiesService.findAll();
  }

  @Public()
  @Get('/:id')
  @ApiResponseType(CommunityEntity)
  async findCommunityById(@Param('id') id: string) {
    return await this.communitiesService.findOne(id);
  }

  @Roles('COMMUNITY_ADMIN')
  @Patch('/:id')
  @ApiResponseType(CommunityEntity)
  async updateCommunity(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return await this.communitiesService.update(id, updateCommunityDto);
  }

  @Roles('SUDO')
  @Delete('/:id')
  @ApiResponseType(CommunityEntity)
  async deleteCommunity(@Param('id') id: string) {
    return await this.communitiesService.remove(id);
  }
}
