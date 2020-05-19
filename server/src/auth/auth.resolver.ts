import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateAccountInput } from 'src/account/dto/create-account.input';
import { AccountService } from 'src/account/account.service';

import { AuthService } from './auth.service';
import { Jwt } from './models/jwt';

@Resolver()
export class AuthResolver {
  constructor(private readonly accountService: AccountService, private readonly authService: AuthService) {}

  @Mutation(() => Jwt)
  async signInAnonymously(@Args('data') createAccountInput: CreateAccountInput): Promise<Jwt> {
    const account = await this.accountService.create(createAccountInput);
    return this.authService.signToken(account.id);
  }
}
