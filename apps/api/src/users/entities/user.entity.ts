import { $Enums } from '@art-space/database';
import { SafeUser } from 'src/types';

export class UserEntity implements SafeUser {
  name: string;
  id: string;
  username: string;
  email: string;
  image: string | null;
  provider: $Enums.CredentialProvider;
  role: $Enums.Role;
  communityId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
