import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from './graphql/GraphQLModule';
import * as ormConfig from '../../ormconfig.json'
import { AppEntities } from './AppEntities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      entities: AppEntities
    }),

    // this is basically the root of our server for now
    GraphQLModule
  ]
})
export class AppModule {}
