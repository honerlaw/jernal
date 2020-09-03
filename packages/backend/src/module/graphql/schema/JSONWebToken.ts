import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class JSONWebToken {

    @Field(type => String)
    accessToken: string

    @Field(type => String, {
        nullable: true
    })
    refreshToken?: string
    
}