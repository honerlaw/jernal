import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/AuthModule";
import { UserModule } from "../user/UserModule";
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { join } from "path";
import { JournalModule } from "../journal/JournalModule";
import { UserResolver } from "./resolver/UserResolver";
import { JournalResolver } from "./resolver/JournalResolver";
import { JournalEntryResolver } from "./resolver/JournalEntryResolver";
import { TransformService } from "./service/TransformService";
import { QuestionModule } from "../question/QuestionModule";
import { QuestionResolver } from "./resolver/QuestionResolver";

@Module({
  imports: [
      NestGraphQLModule.forRoot({
        debug: false,
        playground: true,
        autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
        sortSchema: true,
        context: ({ req }) => ({ req }), // needed for GraphQLAuthGuard
      }),
    AuthModule,
    UserModule,
    JournalModule,
    QuestionModule
  ],
  providers: [UserResolver, JournalResolver, JournalEntryResolver, QuestionResolver, TransformService]
})
export class GraphQLModule {}