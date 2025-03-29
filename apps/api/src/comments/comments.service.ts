import { Injectable } from '@nestjs/common';
import { CommentsRepository } from '../repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  public async getCommentsByPostId(postId: string) {
    return await this.commentsRepository.findAllCommentsByPostId(postId);
  }

  public async getCommentById(id: string) {
    return await this.commentsRepository.findById(id);
  }

  public async createComment(
    postId: string,
    content: string,
    authorId: string,
    parentId?: string,
  ) {
    return await this.commentsRepository.createComment({
      postId,
      content,
      authorId,
      parentId,
    });
  }
}
