import { Community as ICommunity } from '@art-space/database';

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
