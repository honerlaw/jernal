import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { JournalEntry } from "../schema/JournalEntry";
import { GraphQLAuthGuard } from "../../auth/guard/GraphQLAuthGuard";
import { UseGuards } from "@nestjs/common";
import { JournalEntryCreateInput } from "../input/JournalEntryCreateInput";
import { JournalService } from "../../journal/service/JournalService";
import { CurrentUser } from "../decorator/CurrentUser";
import { UserEntity } from "../../user/entity/User";
import { TransformService } from "../service/TransformService";

@Resolver(type => JournalEntry)
export class JournalEntryResolver {

    public constructor(
        private readonly journalService: JournalService,
        private readonly transformService: TransformService
    ) {}

    @Mutation(type => JournalEntry, {
        name: 'createJournalEntry'
    })
    @UseGuards(GraphQLAuthGuard)
    public async create(@CurrentUser() user: UserEntity, @Args('journalEntryCreateInput') journalEntryCreateInput: JournalEntryCreateInput): Promise<JournalEntry> {
        const entry = await this.journalService.createJournalEntry(user, journalEntryCreateInput)

        const transformed = await this.transformService.journalEntries(user, [entry])
        
        return transformed[0]
    }

}