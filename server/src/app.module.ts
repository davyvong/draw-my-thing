import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { formatError } from './common/graphql/formatError';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: process.cwd() + '/src/schema.gql',
      context: (context: unknown) => context,
      formatError,
      installSubscriptionHandlers: true,
      introspection: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AccountModule,
    AuthModule,
  ],
})
export class AppModule {}
