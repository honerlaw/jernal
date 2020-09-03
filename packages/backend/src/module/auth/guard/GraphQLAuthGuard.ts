import { ExtractJwt } from 'passport-jwt'
import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";

// @todo check scope of JWT to see if it is access or refresh
@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') {

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.hasAccessScope(context)) {
      return false;
    }
    return super.canActivate(context)
  }

  private hasAccessScope(context: ExecutionContext): boolean {
    try {
      const req = this.getRequest(context)
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
      const scope = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8')).scope
      return scope === 'access'
    } catch (err) {
      return false
    }
  }
}
