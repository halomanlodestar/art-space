import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'ROLES';
export const Roles = (minRequiredRole: Role) =>
  SetMetadata(ROLES_KEY, minRequiredRole);
