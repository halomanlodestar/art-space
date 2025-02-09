import { createParamDecorator } from '@nestjs/common';

const CurrentUser = createParamDecorator((_data, context) => {
  return context.switchToHttp().getRequest().user;
});

export default CurrentUser;
