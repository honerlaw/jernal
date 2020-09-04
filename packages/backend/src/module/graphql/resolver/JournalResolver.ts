import { Journal } from "../schema/Journal";
import { Resolver, ResolveField, Parent, Query } from "@nestjs/graphql";
import { JournalService } from "../../journal/service/JournalService";
import { CurrentUser } from "../decorator/CurrentUser";
import { UserEntity } from "../../user/entity/User";
import { UseGuards } from "@nestjs/common";
import { GraphQLAuthGuard } from "../../auth/guard/GraphQLAuthGuard";
import { TransformService } from "../service/TransformService";

@Resolver(of => Journal)
@UseGuards(GraphQLAuthGuard)
export class JournalResolver {

    public constructor(
        private readonly journalService: JournalService,
        private readonly transformService: TransformService
    ) {}

    @Query(returns => [Journal], {
        name: 'getJournals',
        nullable: 'items'
    })
    public async journals(@CurrentUser() user: UserEntity): Promise<Journal[]> {
        return await this.transformService.journals(user, await this.journalService.findByUser(user))
    }

}
