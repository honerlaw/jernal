import { ExtractJwt } from 'passport-jwt'
import { Injectable, ExecutionContext, SetMetadata } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';

// token scopes should contain all of the scopes given here
export const Scopes = (...scopes: string[]) => SetMetadata('scopes', scopes)

// @todo check scope of JWT to see if it is access or refresh
@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') {

  public constructor(
    private readonly reflector: Reflector
  ) {
    super('jwt')
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.hasAccessScope(context)) {
      return false;
    }

    (super.canActivate(context) as any).then(console.log)

    return super.canActivate(context)
  }

  private hasAccessScope(context: ExecutionContext): boolean {
    try {
      // default to access scopes
      const scopes = this.reflector.get<string[]>('scopes', context.getHandler()) || ['access']
      const req = this.getRequest(context)
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
      const tokenScopes = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8')).scopes

      // more required scopes then actually exist, not valid
      if (scopes.length > tokenScopes.length) {
        return false
      }

      // make sure the tokenScopes has all the required scopes
      return scopes.every((scope) => {
        return tokenScopes.indexOf(scope) !== -1
      })
    } catch (err) {
      return false
    }
  }
}
