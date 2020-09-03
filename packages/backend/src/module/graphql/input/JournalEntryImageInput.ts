import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class JournalEntryImageInput {

  @Field(type => String)
  path: string // most likely will point to somewhere on s3 or something along those lines

}
