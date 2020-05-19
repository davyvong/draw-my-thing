import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sha256 from 'crypto-js/sha256';
import { uuid } from 'src/common/utils/uuid.utils';

import { Jwt } from './models/jwt';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateHash(id: string): Promise<string> {
    return sha256(uuid(id)).toString();
  }

  async signToken(id: string): Promise<Jwt> {
    const hash = await this.generateHash(id);
    const token = await this.jwtService.signAsync({ hash, id });
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