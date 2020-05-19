import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

import { AccountService } from './account.service';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './models/account.model';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => Account)
  @UseGuards(JwtAuthGuard)
  async findCurrentAccount(@CurrentAccount() account: Account): Promise<Account> {
    return account;
  }

  @Mutation(() => Account)
  @UseGuards(JwtAuthGuard)
  async updateAccount(@CurrentAccount() account: Account, @Args('input') input: UpdateAccountInput): Promise<Account> {
    return this.accountService.findByIdAndUpdate(account.id, input);
  }
}
