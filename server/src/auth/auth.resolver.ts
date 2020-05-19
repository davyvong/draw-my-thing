import { Query, Resolver } from '@nestjs/graphql';
import uuidv4 from 'uuid/v4';

import { AuthService } from './auth.service';
import { Jwt } from './models/jwt';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Jwt)
  async createGuestAccount(): Promise<Jwt> {
    const id = uuidv4();
    return this.authService.signToken(id);
  }
}