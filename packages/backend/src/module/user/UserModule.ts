import { Module, Logger } from "@nestjs/common";
import { UserService } from "./service/UserService";
import { CryptoService } from "./service/CryptoService";
import { AuthModule } from "../auth/AuthModule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CryptoEntity } from "./entity/Crypto";
import { UserEntity } from "./entity/User";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, CryptoEntity])
    ],
    providers: [Logger, UserService, CryptoService],
    exports: [UserService, CryptoService]
})
export class UserModule {}
