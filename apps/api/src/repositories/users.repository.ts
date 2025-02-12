import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { email } });
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({ data: user });
  }

  async updateUser(
    id: string,
    user: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    await this.db.user.update({ where: { id }, data: user });
    return this.db.user.findUnique({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.user.delete({ where: { id } });
  }
}
