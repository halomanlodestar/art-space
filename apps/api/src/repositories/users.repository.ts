import { Prisma, PrismaService, User } from '@art-space/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: PrismaService) {}

  async findById(
    id: string,
    options?: Omit<Prisma.UserFindUniqueArgs, 'where'>,
  ): Promise<User | null> {
    return await this.db.user.findUnique({ where: { id }, ...options });
  }

  async findByEmail(
    email: string,
    options?: Omit<Prisma.UserFindUniqueArgs, 'where'>,
  ): Promise<User | null> {
    return this.db.user.findUnique({ where: { email }, ...options });
  }

  async findByUsername(
    username: string,
    options?: Omit<Prisma.UserFindUniqueArgs, 'where'>,
  ): Promise<User | null> {
    return this.db.user.findUnique({ where: { username }, ...options });
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({ data: user });
  }

  async update(id: string, user: Prisma.UserUpdateInput): Promise<User | null> {
    return await this.db.user.update({ where: { id }, data: user });
  }

  async delete(id: string): Promise<void> {
    await this.db.user.delete({ where: { id } });
  }
}
