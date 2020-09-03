import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UserCreateInput {

    @Field()
    email: string

    @Field()
    password: string

}
