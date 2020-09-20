import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { UserEntity } from "../../user/entity/User";
import { JSONWebToken } from "../../graphql/schema/JSONWebToken";
import { ExceptionID } from "../../../util/ExceptionId";

export type JWTPayload = {
    scopes: string[]
    id: string
}

@Injectable()
export class AuthService {

    public constructor(
        private readonly logger: Logger,
        private readonly jwtService: JwtService
    ) {}

    public async authenticate(user: UserEntity | undefined, password: string): Promise<JSONWebToken> {
        if (!user) {
            throw new UnauthorizedException(ExceptionID.AUTH_LOGIN)
        }

        const matches = await bcrypt.compare(password, user.hash)
        if (!matches) {
            throw new UnauthorizedException(ExceptionID.AUTH_LOGIN)
        }

        return this.generateToken(user)
    }

    public async refresh(user: UserEntity | undefined): Promise<JSONWebToken> {
        if (!user) {
            throw new UnauthorizedException(ExceptionID.AUTH_LOGIN)
        }
        
        // @todo we can check a black list or something in the future to prevent issuing
        // for now though we don't care

        return this.generateToken(user)
    }

    public generateToken(user: UserEntity): JSONWebToken {
        const token = new JSONWebToken()
        token.accessToken = this.jwtService.sign({
            scopes: ['access'],
            id: user.id
        } as JWTPayload)
        token.refreshToken = this.jwtService.sign({
            scopes: ['refresh'],
            id: user.id
        } as JWTPayload, {
            expiresIn: '30d'
        })
        return token
    }

}