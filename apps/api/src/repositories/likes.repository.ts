import { Like, PrismaService } from '@art-space/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesRepository {
  constructor(private readonly db: PrismaService) {}

  async findByUserIdAndPostId(
    userId: string,
    postId: string,
  ): Promise<Like | null> {
    return this.db.like.findFirst({
      where: { userId, postId },
    });
  }

  async create(userId: string, postId: string): Promise<Like> {
    return this.db.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  async delete(userId: string, postId: string): Promise<void> {
    await this.db.like.deleteMany({ where: { userId, postId } });
  }

  async countLikesByPostId(postId: string): Promise<number> {
    return this.db.like.count({ where: { postId } });
  }

  async findAllLikesByUserId(userId: string): Promise<Like[]> {
    return this.db.like.findMany({ where: { userId } });
  }
}
