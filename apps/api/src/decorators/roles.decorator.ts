import { Role } from '@art-space/database';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'ROLES';
export const Roles = (minRequiredRole: Role) =>
  SetMetadata(ROLES_KEY, minRequiredRole);
