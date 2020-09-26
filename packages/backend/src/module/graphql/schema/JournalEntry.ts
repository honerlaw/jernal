
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { JournalEntryImage } from './JournalEntryImage';
import { JournalEntryQuestion } from './JournalEntryQuestion';
import { JournalEntryLocation } from './JournalEntryLocation';

@ObjectType()
export class JournalEntry {
    
  @Field(type => ID)
  id: string;

  @Field(type => [JournalEntryImage], {
    nullable: 'itemsAndList'
  })
  images?: JournalEntryImage[]

  @Field(type => [JournalEntryLocation], {
    nullable: 'itemsAndList'
  })
  locations?: JournalEntryLocation[]

  @Field(type => [JournalEntryQuestion])
  questions: JournalEntryQuestion[]

  @Field(type => String)
  createdAt: string

}
