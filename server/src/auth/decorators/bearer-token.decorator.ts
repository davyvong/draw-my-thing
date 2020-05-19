import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

export const BearerToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  },
);
