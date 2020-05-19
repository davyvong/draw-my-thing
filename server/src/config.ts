import 'dotenv/config';

Object.assign(process.env, {
  NEST_PORT: process.env.PORT || process.env.NEST_PORT || '5000',
});
