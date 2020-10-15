import 'dotenv/config';

Object.assign(process.env, {
  NEST_HOST: process.env.NEST_HOST || '0.0.0.0',
  NEST_PORT: process.env.PORT || process.env.NEST_PORT || '5000',
});
