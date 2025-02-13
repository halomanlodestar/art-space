import { createParamDecorator } from '@nestjs/common';
import { omit } from 'src/lib/utils';
import { SafeUser } from 'src/types.d';

const CurrentUser = createParamDecorator((_data, context): SafeUser => {
  return omit(context.switchToHttp().getRequest().user, ['password']);
});

export default CurrentUser;
