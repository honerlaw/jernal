import { Module, Logger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JournalEntity } from "./entity/Journal";
import { JournalEntryEntity } from "./entity/JournalEntry";
import { JournalEntryImageEntity } from "./entity/JournalEntryImage";
import { JournalEntryQuestionEntity } from "./entity/JournalEntryQuestion";
import { JournalEntryLocationEntity } from "./entity/JournalEntryLocation";
import { JournalService } from "./service/JournalService";
import { UserModule } from "../user/UserModule";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([
            JournalEntity,
            JournalEntryEntity,
            JournalEntryImageEntity,
            JournalEntryQuestionEntity,
            JournalEntryLocationEntity
        ]),
    ],
    providers: [Logger, JournalService],
    exports: [JournalService]
})
export class JournalModule {}