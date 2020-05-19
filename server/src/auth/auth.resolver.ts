import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from 'src/account/account.service';
import { CreateAccountInput } from 'src/account/dto/create-account.input';
import { RequestIP } from 'src/common/decorators/ip.decorator';

import { AuthService } from './auth.service';
import { Jwt } from './models/jwt';

@Resolver()
export class AuthResolver {
  constructor(private readonly accountService: AccountService, private readonly authService: AuthService) {}

  @Mutation(() => Jwt)
  async signInAnonymously(@RequestIP() ip, @Args('input') input: CreateAccountInput): Promise<Jwt> {
    const account = await this.accountService.create(ip, input);
    return this.authService.signToken(account.id);
  }
}
