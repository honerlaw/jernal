import { InputType, Field, ID } from "@nestjs/graphql";
import { JournalEntryQuestionInput } from "./JournalEntryQuestionInput";
import { JournalEntryImageInput } from "./JournalEntryImageInput";
import { JournalEntryLocationInput } from "./JournalEntryLocationInput";

@InputType()
export class JournalEntryCreateInput {

    @Field(type => ID)
    journalId: string

    @Field(type => [JournalEntryQuestionInput], {
        nullable: 'items'
    })
    questions: JournalEntryQuestionInput[]

    @Field(type => [JournalEntryLocationInput], {
        nullable: 'itemsAndList'
    })
    locations?: JournalEntryLocationInput[]

    @Field(type => [JournalEntryImageInput], {
        nullable: 'itemsAndList'
    })
    images?: JournalEntryImageInput[]

}

