import { LikesRepository } from './../repositories/likes.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  async like(userId: string, postId: string) {
    return await this.likesRepository.create(userId, postId);
  }

  async unlike(userId: string, postId: string) {
    return await this.likesRepository.delete(userId, postId);
  }
}
