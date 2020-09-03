import { Field, ID, ObjectType } from '@nestjs/graphql';
import {JournalEntry} from './JournalEntry'

@ObjectType()
export class Journal {
    
  @Field(type => ID)
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => [JournalEntry], {
    nullable: 'itemsAndList'
  })
  entries?: JournalEntry[]

}
