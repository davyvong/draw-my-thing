import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Jwt } from './models/jwt';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signToken(id: string): Promise<Jwt> {
    const token = await this.jwtService.signAsync({ id });
    const payload = await this.verifyToken(token);
    return {
      exp: payload.exp,
      iat: payload.iat,
      token,
    };
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }
}