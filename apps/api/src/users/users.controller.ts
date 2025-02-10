import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
