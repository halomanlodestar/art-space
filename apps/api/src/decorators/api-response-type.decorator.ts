import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiResponseType = <T extends Type<any>>(
  dto: T,
  isArray = false,
) => {
  return applyDecorators(ApiResponse({ type: dto, isArray }));
};
