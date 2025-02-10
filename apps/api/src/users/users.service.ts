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

  findById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  findByUsername(username: string) {
    return this.db.user.findUnique({ where: { username } });
  }

  updateUser(data: UpdateUserDto) {}
}
