import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

const DeviceType = createParamDecorator((_data, context) => {
  return context.switchToHttp().getRequest<Request>().headers['device-type'];
});

export default DeviceType;
