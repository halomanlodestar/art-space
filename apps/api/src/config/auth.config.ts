import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'auth',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET ?? 'secret',
  }),
);
