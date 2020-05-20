import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { AccountModule } from 'src/account/account.module';

import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';
import { RoomSchema } from './schemas/room.schema';

@Module({
  exports: [RoomService],
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
    AccountModule,
  ],
  providers: [
    {
      provide: 'PubSub',
      useValue: new PubSub(),
    },
    RoomResolver,
    RoomService,
  ],
})
export class RoomModule {}