import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import GraphQLJSON from 'graphql-type-json';
import { ConnectionContext } from 'subscriptions-transport-ws';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { formatError } from './common/graphql/format-error';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: process.cwd() + '/src/schema.gql',
      context: (context: unknown) => context,
      formatError,
      installSubscriptionHandlers: true,
      introspection: process.env.NODE_ENV === 'development',
      path: '/',
      playground: process.env.NODE_ENV === 'development',
      resolvers: { JSON: GraphQLJSON },
      subscriptions: {
        keepAlive: 5000,
        onDisconnect: async (socket, context: ConnectionContext) => {
          const { subscriptionClient } = await context.initPromise;
          if (subscriptionClient) {
            subscriptionClient.close();
          }
        },
        path: '/',
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ScheduleModule.forRoot(),
    AccountModule,
    AuthModule,
    RoomModule,
  ],
})
export class AppModule { }
