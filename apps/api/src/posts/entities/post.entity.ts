import { Post } from '@art-space/database';

export class PostEntity implements Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  communityId: string;
}
