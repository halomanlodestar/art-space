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
import { ApiAuth } from '../decorators/auth-header.decorator';

@ApiTags('communities')
@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly postsService: PostsService,
  ) {}

  @Roles('SUDO')
  @Post()
  @ApiAuth()
  @ApiResponseType(CommunityEntity)
  async createCommunity(
    @Body() createCommunityDto: CreateCommunityDto,
    @CurrentUser() creator: SafeUser,
  ) {
    return await this.communitiesService.create(createCommunityDto, creator);
  }

  @Public()
  @Get('search/:search')
  @ApiResponseType(CommunityEntity, true)
  async searchCommunities(@Param('search') search: string) {
    return this.communitiesService.search(search);
  }

  @Public()
  @Get(':slug/posts')
  @ApiResponseType(PostEntity, true)
  async getPostsByCommunity(@Param('slug') slug: string) {
    return await this.postsService.getPostsByCommunitySlug(slug);
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
  @ApiAuth()
  @ApiResponseType(CommunityEntity)
  async updateCommunity(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return await this.communitiesService.update(id, updateCommunityDto);
  }

  @Roles('SUDO')
  @Delete('/:id')
  @ApiAuth()
  @ApiResponseType(CommunityEntity)
  async deleteCommunity(@Param('id') id: string) {
    return await this.communitiesService.remove(id);
  }
}
