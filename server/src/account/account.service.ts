import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'src/auth/models/jwt-payload.model';

import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './models/account.model';

@Injectable()
export class AccountService {
  constructor(@InjectModel('Account') private readonly accountModel) {}

  async create(createAccountInput: CreateAccountInput): Promise<Account> {
    return this.accountModel.create(createAccountInput);
  }

  async findById(id: string): Promise<Account> {
    return this.accountModel.findById(id);
  }

  async findByIdAndUpdate(id: string, updateAccountInput: UpdateAccountInput): Promise<Account> {
    return this.accountModel.findByIdAndUpdate({ _id: id }, updateAccountInput, { new: true });
  }

  async findByPayload(payload: JwtPayload): Promise<Account> {
    return this.accountModel.findById(payload.id);
  }
}