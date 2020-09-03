
import { Field, ID, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class JournalEntryLocation {
    
  @Field(type => ID)
  id: string;

  @Field(type => Float)
  longitude: number

  @Field(type => Float)
  latitude: number

}
