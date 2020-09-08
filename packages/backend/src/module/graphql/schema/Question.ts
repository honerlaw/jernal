import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Answer } from "./Answer";

@ObjectType()
export class Question {
    
  @Field(type => ID)
  id: string;

  @Field(type => String)
  question: string

  @Field(type => String)
  category: string

  @Field(type => [Answer], {
      nullable: 'itemsAndList'
  })
  answers?: Answer[]
  
}