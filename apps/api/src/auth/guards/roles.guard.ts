import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum, SafeUser } from '@art-space/shared/types';
import { Role } from '@art-space/database';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const minRequiredRole = this.reflector.getAllAndOverride<Role>('ROLES', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!minRequiredRole) return true;

    const requiredRoleWeight = RoleEnum[minRequiredRole];
    const { user } = context.switchToHttp().getRequest();
    const userRoleWeight = RoleEnum[(user as SafeUser).role];

    console.log(
      'requiredRoleWeight',
      requiredRoleWeight,
      'userRoleWeight',
      userRoleWeight,
    );

    return RoleEnum[userRoleWeight] >= RoleEnum[requiredRoleWeight];
  }
}
