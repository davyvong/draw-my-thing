import { RoomSchema } from './schemas/room.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

@Module({
  exports: [RoomService],
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  providers: [RoomResolver, RoomService],
})
export class RoomModule {}