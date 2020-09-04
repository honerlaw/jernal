import { User } from "src/module/graphql/schema/User";
import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { UserCreateInput } from "../input/UserCreateInput";
import { JSONWebToken } from "../../graphql/schema/JSONWebToken";
import { UserAuthenticationInput } from "../input/UserAuthenticationInput";
import { AuthService } from "../../auth/service/AuthService";
import { UseGuards } from "@nestjs/common";
import { UserService } from "../../user/service/UserService";
import { CurrentUser } from "../decorator/CurrentUser";
import { UserEntity } from "../../user/entity/User";
import { GraphQLAuthGuard, Scopes } from "../../auth/guard/GraphQLAuthGuard";

@Resolver(of => User)
export class UserResolver {

  public constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Mutation(returns  => JSONWebToken, {
    name: 'authenticateUser'
  })
  async authenticate(@Args('userAuthenticationInput') userAuthenticationInput: UserAuthenticationInput): Promise<JSONWebToken> {
    const user = await this.userService.findByEmail(userAuthenticationInput.email)
    return await this.authService.authenticate(user, userAuthenticationInput.password)
  }

  @Mutation(returns => JSONWebToken, {
    name: 'refreshUser'
  })
  @Scopes('refresh')
  @UseGuards(GraphQLAuthGuard)
  async refresh(@CurrentUser() user: UserEntity): Promise<JSONWebToken> {
    return await this.authService.refresh(user)
  }

  @Mutation(returns => JSONWebToken, {
    name: 'createUser'
  })
  async create(@Args('userCreateInput') userCreateInput: UserCreateInput): Promise<JSONWebToken> {
    const user = await this.userService.create(userCreateInput.email, userCreateInput.password)
    return await this.authService.generateToken(user)
  }

}
