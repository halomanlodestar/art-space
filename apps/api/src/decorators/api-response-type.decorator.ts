import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiResponseType = <T extends Type<any>>(dto: T) => {
  if (Array.isArray(dto)) {
    return applyDecorators(ApiResponse({ type: dto[0], isArray: true }));
  } else {
    return applyDecorators(ApiResponse({ type: dto }));
  }
};
