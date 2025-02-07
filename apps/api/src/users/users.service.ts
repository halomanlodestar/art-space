import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import argon from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async create(credentials: CreateUserDto) {
    const { email, ...data } = credentials;
    const hashedPassword = await argon.hash(data.password);

    return this.db.user.create({
      data: {
        email,
        name: data.name,
        username: data.username,
        password: hashedPassword,
        role: 'USER',
      },
    });
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  findByUsername(username: string) {
    return this.db.user.findUnique({ where: { username } });
  }

  updateUser(data: UpdateUserDto) {}
}
