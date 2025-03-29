import { Comment } from '@art-space/database';

export class CommentEntity implements Comment {
  parentId: string | null;
  id: string;
  postId: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}
