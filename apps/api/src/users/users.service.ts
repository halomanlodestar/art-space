import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import argon from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { CredentialProvider } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async create(credentials: CreateUserDto, provider?: CredentialProvider) {
    const { password, ...rest } = credentials;
    const hashedPassword = await argon.hash(password);

    return this.db.user.create({
      data: {
        provider,
        password: hashedPassword,
        ...rest,
      },
    });
  }

  async findById(id: string) {
    return await this.db.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.db.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string) {
    return await this.db.user.findUnique({
      where: { username },
      include: {
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
      },
      omit: {
        id: true,
        email: true,
        communityId: true,
        password: true,
        provider: true,
      },
    });
  }

  updateUser(data: UpdateUserDto) {}
}
