import { Injectable } from "@nestjs/common";
import { CryptoService, Decryptor } from "../../user/service/CryptoService";
import { UserEntity } from "../../user/entity/User";
import { JournalEntity } from "../../journal/entity/Journal";
import { Journal } from "../schema/Journal";
import { JournalEntry } from "../schema/JournalEntry";
import { JournalEntryEntity } from "../../journal/entity/JournalEntry";
import { QuestionEntity } from "../../question/entity/Question";
import { Question } from "../schema/Question";

@Injectable()
export class TransformService {

    public constructor(
        private readonly cryptoService: CryptoService
    ) {}

    public async journals(user: UserEntity, journals: JournalEntity[]): Promise<Journal[]> {
        const decryptor = await this.cryptoService.createDecryptor(user)

        return await Promise.all(journals.map(async (journal) => {
            return {
                id: journal.id,
                name: decryptor.decrypt(journal.name),
                entries: await this.journalEntries(user, journal.entries, decryptor)
            }
        }))
    }

    public async journalEntries(user: UserEntity, entries: JournalEntryEntity[], decryptor?: Decryptor): Promise<JournalEntry[]> {
        decryptor = decryptor ?? await this.cryptoService.createDecryptor(user)

        return await Promise.all(entries.map(async (entry) => {
            return {
                id: entry.id,
                images: entry.images.map((image) => {
                    return {
                        id: image.id,
                        path: decryptor.decrypt(image.path)
                    }
                }),
                locations: entry.locations.map((location) => {
                    return {
                        id: location.id,
                        longitude: location.longitude,
                        latitude: location.latitude
                    }
                }),
                questions: await Promise.all(entry.questions.map(async (question) => {
                    return {
                        id: question.id,
                        question: await this.question(user, question.question, decryptor),
                        answer: decryptor.decrypt(question.answer)
                    }
                }))
            }
        }))
    }

    public async questions(user: UserEntity, questions: QuestionEntity[], decryptor?: Decryptor): Promise<Question[]> {
        decryptor = decryptor ?? await this.cryptoService.createDecryptor(user)

        return await Promise.all(questions.map((question) => {
            return this.question(user, question, decryptor)
        }))
    }

    public async question(user: UserEntity, questionEntity: QuestionEntity, decryptor?: Decryptor): Promise<Question> {
        decryptor = decryptor ?? await this.cryptoService.createDecryptor(user)

        return {
            id: questionEntity.id,
            question: questionEntity.user ? decryptor.decrypt(questionEntity.question) : questionEntity.question,
            category: questionEntity.user ? decryptor.decrypt(questionEntity.category) : questionEntity.category,
            answers: questionEntity.answers?.map((answerEntity) => {
                return {
                    id: answerEntity.id,
                    answer: answerEntity.user ? decryptor.decrypt(answerEntity.answer) : answerEntity.answer
                }
            })
        }
    }

}
