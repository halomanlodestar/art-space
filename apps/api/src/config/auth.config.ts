import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  sessionSecret: process.env.SESSION_SECRET,
}));
