
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JournalEntryQuestion {
    
  @Field(type => ID)
  id: string;

  @Field(type => String)
  question: string

  @Field(type => String)
  answer: string

}
