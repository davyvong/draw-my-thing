import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountSchema } from './schemas/account.schema';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
  exports: [AccountService],
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}