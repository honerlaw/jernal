import { User } from "src/module/graphql/schema/User";
import { Resolver, Query, Args, ID, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { UserCreateInput } from "../input/UserCreateInput";
import { JSONWebToken } from "../../graphql/schema/JSONWebToken";
import { UserAuthenticationInput } from "../input/UserAuthenticationInput";
import { AuthService } from "../../auth/service/AuthService";
import { NotFoundException } from "@nestjs/common";
import { UserService } from "../../user/service/UserService";

@Resolver(of => User)
export class UserResolver {

  public constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Query(returns => User, {
    name: 'findUser'
  })
  async find(@Args('id', { type: () => ID }) id: string): Promise<User> {
    const user = await this.userService.findById(id)
    if (!user) {
      throw new NotFoundException()
    }
    return {
        id: user.id,
        email: user.email
    }
  }

  @Mutation(returns  => JSONWebToken, {
    name: 'authenticateUser'
  })
  async authenticate(@Args('userAuthenticationInput') userAuthenticationInput: UserAuthenticationInput): Promise<JSONWebToken> {
    const user = await this.userService.findByEmail(userAuthenticationInput.email)
    return await this.authService.authenticate(user, userAuthenticationInput.password)
  }

  @Mutation(returns => JSONWebToken, {
    name: 'createUser'
  })
  async create(@Args('userCreateInput') userCreateInput: UserCreateInput): Promise<JSONWebToken> {
    const user = await this.userService.create(userCreateInput.email, userCreateInput.password)
    return await this.authService.generateToken(user)
  }

}
