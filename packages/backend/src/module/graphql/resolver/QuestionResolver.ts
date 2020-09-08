import { Question } from "../schema/Question";
import { Resolver, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GraphQLAuthGuard } from "../../auth/guard/GraphQLAuthGuard";
import { QuestionService } from "../../question/service/QuestionService";
import { TransformService } from "../service/TransformService";
import { CurrentUser } from "../decorator/CurrentUser";
import { UserEntity } from "src/module/user/entity/User";

@Resolver(type => Question)
@UseGuards(GraphQLAuthGuard)
export class QuestionResolver {

    public constructor(
        private readonly questionService: QuestionService,
        private readonly transformService: TransformService
    ) {}

    @Query(returns => [Question], {
        name: 'getQuestions',
        nullable: 'items'
    })
    public async journals(@CurrentUser() user: UserEntity): Promise<Question[]> {
        return await this.transformService.questions(user, await this.questionService.findByUser(user))
    }

}