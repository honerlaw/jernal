import { Module } from "@nestjs/common";
import { UserModule } from "../user/UserModule";
import { QuestionService } from "./service/QuestionService";
import { SeedService } from "./service/SeedService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionEntity } from "./entity/Question";
import { AnswerEntity } from "./entity/Answer";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([
            QuestionEntity,
            AnswerEntity
        ])
    ],
    exports: [QuestionService],
    providers: [QuestionService, SeedService]
})
export class QuestionModule {

    public constructor(
        private readonly seedService: SeedService
    ) {}

    async onApplicationBootstrap(): Promise<void> {
        await this.seedService.seed()
    }

}
