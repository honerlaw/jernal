import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserService } from '../../user/service/UserService';
import { JWTPayload } from '../service/AuthService';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // delegates expiration to passport
      secretOrKey: 'tis-a-secret'
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.userService.findById(payload.id)
    if (!user) {
      this.logger.debug(`valid token found, but no user found for given id (${payload.id})`)
      throw new UnauthorizedException()
    }
    return user
  }
}