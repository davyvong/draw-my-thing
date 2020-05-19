import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AccountService } from 'src/account/account.service';

import { AuthService } from '../auth.service';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const hash = await this.authService.generateHash(payload.id);
    if (hash !== payload.hash) {
      return done(new UnauthorizedException(), false);
    }
    const account = this.accountService.findByPayload(payload);
    if (!account) {
      return done(new UnauthorizedException(), false);
    }
    return done(null, account, payload.iat);
  }
}