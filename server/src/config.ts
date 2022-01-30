import 'dotenv/config';

Object.assign(process.env, {
  NEST_HOST: process.env.NEST_HOST,
  NEST_PORT: process.env.NEST_PORT,
});
