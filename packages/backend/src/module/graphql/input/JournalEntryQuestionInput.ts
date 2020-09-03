import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class JournalEntryQuestionInput {

  @Field(type => String)
  question: string

  @Field(type => String)
  answer: string

}
