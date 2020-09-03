import { InputType, Field, Float } from "@nestjs/graphql"

@InputType()
export class JournalEntryLocationInput {

  @Field(type => Float)
  longitude: number

  @Field(type => Float)
  latitude: number

}
