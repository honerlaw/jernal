import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user/entity/User';
import { JournalEntity } from './journal/entity/Journal';
import { CryptoEntity } from './user/entity/Crypto';
import { GraphQLModule } from './graphql/GraphQLModule';
import { JournalEntryEntity } from './journal/entity/JournalEntry';
import { JournalEntryImageEntity } from './journal/entity/JournalEntryImage';
import { JournalEntryQuestionEntity } from './journal/entity/JournalEntryQuestion';
import { JournalEntryLocationEntity } from './journal/entity/JournalEntryLocation';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // @todo move to ormconfig.json
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'jernal',
      entities: [
        UserEntity,
        JournalEntity,
        JournalEntryEntity,
        JournalEntryImageEntity,
        JournalEntryQuestionEntity,
        JournalEntryLocationEntity,
        CryptoEntity
      ],
      synchronize: true,
      logging: "all"
    }),

    // this is basically the root of our server for now
    GraphQLModule
  ]
})
export class AppModule {}
