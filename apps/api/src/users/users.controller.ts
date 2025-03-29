import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';
import CurrentUser from 'src/decorators/current-user.decorator';
import { SafeUser } from 'src/types.d';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/decorators/api-response-type.decorator';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('/:username')
  @ApiResponseType(UserEntity)
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Patch()
  @ApiResponseType(UserEntity)
  async updateUser(@CurrentUser() user: SafeUser, data: UpdateUserDto) {
    return await this.usersService.update(user.username, data);
  }

  @Delete()
  @ApiResponseType(UserEntity)
  async deleteUser(@CurrentUser() user: SafeUser) {
    return await this.usersService.delete(user.id);
  }
}
