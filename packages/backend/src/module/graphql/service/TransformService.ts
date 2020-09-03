import { Injectable } from "@nestjs/common";
import { CryptoService, Decryptor } from "../../user/service/CryptoService";
import { UserEntity } from "../../user/entity/User";
import { JournalEntity } from "../../journal/entity/Journal";
import { Journal } from "../schema/Journal";
import { JournalEntry } from "../schema/JournalEntry";
import { JournalEntryEntity } from "src/module/journal/entity/JournalEntry";

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

        return entries.map((entry) => {
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
                questions: entry.questions.map((question) => {
                    return {
                        id: question.id,
                        question: decryptor.decrypt(question.question),
                        answer: decryptor.decrypt(question.answer)
                    }
                })
            }
        })
    }

}
