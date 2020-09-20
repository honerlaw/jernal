import { Injectable, ConflictException, Logger, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { UserEntity } from "../entity/User";
import { Repository, Connection } from "typeorm";
import { InjectRepository, InjectConnection } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt"
import { CryptoEntity } from "../entity/Crypto";
import * as crypto from 'crypto'
import { JournalEntity } from "../../journal/entity/Journal";
import { ExceptionID } from "../../../util/ExceptionId";
import { CryptoService } from "./CryptoService";

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const HASH_ROUNDS = 12

@Injectable()
export class UserService {

    public constructor(
        private readonly logger: Logger,
        private readonly cryptoService: CryptoService,

        @InjectConnection()
        private readonly connection: Connection,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async findByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({
            where: {
                email: email.toLowerCase()
            }
        })
    }

    public async findById(id: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    public async create(email: string, password: string): Promise<UserEntity> {
        if (EMAIL_REGEX.exec(email) === null) {
            throw new BadRequestException(ExceptionID.USER_CREATE_FAILURE)
        }

        const runner = this.connection.createQueryRunner()
        await runner.connect()
        await runner.startTransaction()
        try {
            const found = await runner.manager.findOne(UserEntity, {
                where: {
                    email: email.toLowerCase()
                }
            })

            // found the user, so can't add them
            if (found) {
                this.logger.debug(`could not find user for given email (${email})`)
                throw new ConflictException(ExceptionID.USER_CREATE_FAILURE_EMAIL_IN_USE)
            }

            // otherwise lets go ahead and insert the new user
            const hash = await bcrypt.hash(password, HASH_ROUNDS)
            await runner.manager.insert(UserEntity, {
                email: email.toLowerCase(),
                hash: hash
            })

            const insertedUser = await runner.manager.findOne(UserEntity, {
                where: {
                    email: email.toLowerCase()
                }
            })
            if (!insertedUser) {
                this.logger.debug('could not find user after insertion')
                throw new NotFoundException(ExceptionID.USER_NOT_FOUND)
            }

            // insert the encryption key for this user
            const randomPass = crypto.randomBytes(48).toString('hex')
            const randomSalt = crypto.randomBytes(48).toString('hex')
            const secretKey = crypto.scryptSync(randomPass, randomSalt, 16).toString('hex')
            const initVector = crypto.randomBytes(8).toString('hex')
            await runner.manager.insert(CryptoEntity, {
                user: insertedUser,
                secretKey,
                initVector,
            })

            // next up insert the "default" daily journal for the user
            await runner.manager.insert(JournalEntity, {
                user: insertedUser,
                name: this.cryptoService.encryptWithKey(secretKey, initVector, 'Daily')
            })

            await runner.commitTransaction()

            return insertedUser
        } catch (err) {
            await runner.rollbackTransaction()

            this.logger.error(err)
            throw new InternalServerErrorException(ExceptionID.USER_CREATE_FAILURE)
        } finally {
            await runner.release()
        }
    }

}