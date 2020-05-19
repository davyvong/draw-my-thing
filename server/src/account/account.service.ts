import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { JwtPayload } from 'src/auth/models/jwt-payload.model';

import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './models/account.model';

@Injectable()
export class AccountService {
  constructor(@InjectModel('Account') private readonly accountModel) {}

  async create(ip: string, input: CreateAccountInput): Promise<Account> {
    const account = {
      ...input,
      createdOn: moment().unix(),
      ip,
    }
    return this.accountModel.create(account);
  }

  async findById(id: string): Promise<Account> {
    return this.accountModel.findById(id);
  }

  async findByIdAndUpdate(id: string, input: UpdateAccountInput): Promise<Account> {
    return this.accountModel.findByIdAndUpdate({ _id: id }, input, { new: true });
  }

  async findByPayload(payload: JwtPayload): Promise<Account> {
    return this.accountModel.findById(payload.id);
  }
}