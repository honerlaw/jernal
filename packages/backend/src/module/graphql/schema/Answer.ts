import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Answer {
    
  @Field(type => ID)
  id: string;

  @Field(type => String)
  answer: string

}
