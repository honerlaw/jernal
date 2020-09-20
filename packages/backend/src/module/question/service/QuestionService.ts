import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { QuestionEntity } from "../entity/Question";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../user/entity/User";


@Injectable()
export class QuestionService {

    public constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>
    ) {}

    public async findByUser(user: UserEntity): Promise<QuestionEntity[]> {
        return await this.questionRepository.find({
            where: [{
                user: null
            }, {
                user
            }],
            order: {
                order: 'ASC'
            }
        })
    }

}