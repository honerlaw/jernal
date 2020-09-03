
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JournalEntryImage {
    
  @Field(type => ID)
  id: string;

  @Field(type => String)
  path: string

}
