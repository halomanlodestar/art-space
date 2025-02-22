import { Like } from '@art-space/database';

export class LikeEntity implements Like {
  id: string;
  userId: string;
  postId: string;
  commentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
