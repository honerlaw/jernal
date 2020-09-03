import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as crypto from "crypto"
import { CryptoEntity } from "../entity/Crypto";
import { UserEntity } from "../entity/User";

export type Encryptor = {
    encrypt: (data: string) => string | null
}

export type Decryptor = {
    decrypt: (data: string) => string | null 
}

@Injectable()
export class CryptoService {

    public constructor(
        private readonly logger: Logger,
        @InjectRepository(CryptoEntity)
        private readonly cryptoRepository: Repository<CryptoEntity>
    ) {}

    public encryptWithKey(key: string, iv: string, datum: string): string | null {
        try {
            let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
            let encrypted = cipher.update(datum, 'utf8', 'base64');
            encrypted += cipher.final('base64');
            return encrypted.toString()
        } catch (err) {
            this.logger.error(err)
            return null
        }
    }

    public decryptWithKey(key: string, iv: string, datum: string): string {
        try {
            let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decrypted = decipher.update(datum, 'base64', 'utf8');
            return (decrypted + decipher.final('utf8'));
        } catch (err) {
            this.logger.error(err)
            return null
        }
    }

    public async createDecryptor(user: UserEntity): Promise<Decryptor> {
        const userCrypto = await this.cryptoRepository.findOne({
            where: {
                user: user
            }
        })

        if (!userCrypto) {
            this.logger.debug('could not find crypto data for user')
            throw new InternalServerErrorException()
        }

        return {
            decrypt: (data: string) => this.decryptWithKey(userCrypto.secretKey, userCrypto.initVector, data)
        }
    }

    public async createEncryptor(user: UserEntity): Promise<Encryptor> {
        const userCrypto = await this.cryptoRepository.findOne({
            where: {
                user: user
            }
        })

        if (!userCrypto) {
            this.logger.debug('could not find crypto data for user')
            throw new InternalServerErrorException()
        }

        return {
            encrypt: (data: string) => this.encryptWithKey(userCrypto.secretKey, userCrypto.initVector, data)
        }
    }

}