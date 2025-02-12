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

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Roles('SUDO')
  @Post()
  async create(
    @Body() createCommunityDto: CreateCommunityDto,
    @CurrentUser() creator: SafeUser,
  ) {
    return await this.communitiesService.create(createCommunityDto, creator);
  }

  @Public()
  @Get('/')
  async findAll() {
    return await this.communitiesService.findAll();
  }

  @Public()
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.communitiesService.findOne(id);
  }

  @Roles('COMMUNITY_ADMIN')
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return await this.communitiesService.update(id, updateCommunityDto);
  }

  @Roles('SUDO')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.communitiesService.remove(id);
  }
}
