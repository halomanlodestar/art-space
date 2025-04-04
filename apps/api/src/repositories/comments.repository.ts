import { Prisma, PrismaService, Comment } from '@art-space/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsRepository {
  constructor(private readonly db: PrismaService) {}

  async findByUserIdAndPostId(
    userId: string,
    postId: string,
  ): Promise<Comment | null> {
    return this.db.comment.findFirst({
      where: { authorId: userId, postId },
    });
  }

  async findById(id: string): Promise<Comment | null> {
    return this.db.comment.findUnique({ where: { id } });
  }

  async findAllCommentsByPostId(postId: string): Promise<Comment[]> {
    return this.db.comment.findMany({
      where: {
        postId,
      },
    });
  }

  async createComment<T extends Prisma.CommentCreateManyInput>(
    comment: T,
  ): Promise<Comment> {
    return this.db.comment.create({
      data: comment,
    });
  }

  async deleteComment(userId: string, postId: string): Promise<void> {
    await this.db.comment.deleteMany({ where: { authorId: userId, postId } });
  }

  async countCommentsByPostId(postId: string): Promise<number> {
    return this.db.comment.count({ where: { postId } });
  }

  async findAllCommentsByUserId(userId: string): Promise<Comment[]> {
    return this.db.comment.findMany({ where: { authorId: userId } });
  }
}
