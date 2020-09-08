import { Injectable, Logger, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { UserEntity } from "../../user/entity/User";
import { InjectRepository, InjectConnection } from "@nestjs/typeorm";
import { JournalEntity } from "../entity/Journal";
import { Repository, Connection } from "typeorm";
import { JournalEntryCreateInput } from "../../graphql/input/JournalEntryCreateInput";
import { ExceptionID } from "../../../util/ExceptionId";
import { JournalEntryEntity } from "../entity/JournalEntry";
import { JournalEntryImageEntity } from "../entity/JournalEntryImage";
import { JournalEntryLocationEntity } from "../entity/JournalEntryLocation";
import { JournalEntryQuestionEntity } from "../entity/JournalEntryQuestion";
import { CryptoService } from "../../user/service/CryptoService";
import { QuestionEntity } from "../../question/entity/Question";

@Injectable()
export class JournalService {

    public constructor(
        private readonly logger: Logger,
        private readonly cryptoService: CryptoService,

        @InjectConnection()
        private readonly connection: Connection,

        @InjectRepository(JournalEntity)
        private readonly journalRepository: Repository<JournalEntity>,

        @InjectRepository(JournalEntryEntity)
        private readonly journalEntryRepository: Repository<JournalEntryEntity>
    ) {}

    // @todo for now we eager load all of this information up front and return it so graphql then can handle serving it
    // instead we should piece meal it together based on what is requested or not
    public async findByUser(user: UserEntity): Promise<JournalEntity[]> {
        return await this.journalRepository.find({
            where: {
                user
            }
        })
    }

    public async findJournalEntryById(id: string): Promise<JournalEntryEntity | undefined> {
        return await this.journalEntryRepository.findOne({
            where: {
                id
            }
        })
    }

    public async createJournalEntry(user: UserEntity, journalEntryInput: JournalEntryCreateInput): Promise<JournalEntryEntity> {
        // we might not actually need a transaction?
        const runner = this.connection.createQueryRunner()
        await runner.connect()
        await runner.startTransaction()
        try {
            const journal = await runner.manager.findOne(JournalEntity, {
                where: {
                    id: journalEntryInput.journalId,
                    user: {
                        id: user.id
                    }
                },
                loadEagerRelations: false
            })

            if (!journal) {
                this.logger.debug(`could not find journal for given id (${journalEntryInput.journalId})`)
                throw new NotFoundException(ExceptionID.JOURNAL_NOT_FOUND)
            }

            const encryptor = await this.cryptoService.createEncryptor(user)

            // create the entry
            const result = await runner.manager.insert(JournalEntryEntity, {
                journal,
            })
            const entryId = result.identifiers[0].id
            const entry = await runner.manager.findOne(JournalEntryEntity, {
                where: {
                    id: entryId
                }
            })
            if (!entry) {
                this.logger.debug('failed to find entry that was previously inserted')
                throw new InternalServerErrorException()
            }

            for (const image of journalEntryInput.images) {
                await runner.manager.insert(JournalEntryImageEntity, {
                    journalEntry: entry,
                    path: encryptor.encrypt(image.path)
                })
            }

            for (const location of journalEntryInput.locations) {

                // @todo should this be encrypted?
                await runner.manager.insert(JournalEntryLocationEntity, {
                    journalEntry: entry,
                    longitude: location.longitude,
                    latitude: location.latitude
                })
            }

            for (const question of journalEntryInput.questions) {
                const foundQuestion = await runner.manager.findOne(QuestionEntity, {
                    where: {
                        id: question.question
                    }
                })

                // @todo more descript error?
                if (!foundQuestion) {
                    throw new NotFoundException(ExceptionID.JOURNAL_ENTRY_CREATE_FAILURE)
                }

                await runner.manager.insert(JournalEntryQuestionEntity, {
                    journalEntry: entry,
                    question: foundQuestion,
                    answer: encryptor.encrypt(question.answer)
                })
            }

            await runner.commitTransaction()

            return await this.findJournalEntryById(entryId)
        } catch (err) {
            await runner.rollbackTransaction()

            this.logger.error(err.message, err)
            throw new InternalServerErrorException(ExceptionID.JOURNAL_ENTRY_CREATE_FAILURE)
        } finally {
            await runner.release()
        }
    }

}