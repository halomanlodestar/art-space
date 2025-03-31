import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function ApiAuth() {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
    }),
  );
}
