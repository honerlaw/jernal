
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Question } from './Question';

@ObjectType()
export class JournalEntryQuestion {
    
  @Field(type => ID)
  id: string;

  // this is the answer you wrote down
  @Field(type => String)
  answer: string

  // this is the question that was provided
  @Field(type => Question)
  question: Question

}
