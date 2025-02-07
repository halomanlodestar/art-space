import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly db: PrismaService) {}

  getPosts() {
    this.db.post.findMany();
  }

  getPost(id: string) {
    return this.db.post.findUnique({ where: { id } });
  }

  createPost(authorId: string, body: CreatePostDto) {}

  deletePost() {
    throw new Error('Method not implemented.');
  }
  updatePost() {
    throw new Error('Method not implemented.');
  }
}
