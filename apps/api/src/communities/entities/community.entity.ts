import { Community as ICommunity } from '@prisma/client';

export class CommunityEntity implements ICommunity {
  name: string;
  id: string;
  createdById: string;
  slug: string;
  description: string;
  image: string | null;
  banner: string;
  createdAt: Date;
  updatedAt: Date;
}
