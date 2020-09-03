import { Module, Logger } from "@nestjs/common";
import { JWTStrategy } from "./strategy/JWTStrategy";
import { AuthService } from "./service/AuthService";
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from '@nestjs/passport'
import { UserModule } from "../user/UserModule";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'tis-a-secret', // @todo this is also used in JWTStrategy
            signOptions: {
              expiresIn: '600s' // @todo change expires
            },
        }),
        UserModule
    ],
    providers: [AuthService, JWTStrategy, Logger],
    exports: [AuthService]
})
export class AuthModule {}
