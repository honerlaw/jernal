import { UserEntity } from "./user/entity/User";
import { JournalEntity } from "./journal/entity/Journal";
import { JournalEntryEntity } from "./journal/entity/JournalEntry";
import { JournalEntryImageEntity } from "./journal/entity/JournalEntryImage";
import { JournalEntryQuestionEntity } from "./journal/entity/JournalEntryQuestion";
import { JournalEntryLocationEntity } from "./journal/entity/JournalEntryLocation";
import { CryptoEntity } from "./user/entity/Crypto";
import { QuestionEntity } from "./question/entity/Question";
import { AnswerEntity } from "./question/entity/Answer";

export const AppEntities = [
    UserEntity,
    JournalEntity,
    JournalEntryEntity,
    JournalEntryImageEntity,
    JournalEntryQuestionEntity,
    JournalEntryLocationEntity,
    CryptoEntity,
    QuestionEntity,
    AnswerEntity,
    UserEntity
]