import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UserAuthenticationInput {

    @Field()
    email: string

    @Field()
    password: string

}
