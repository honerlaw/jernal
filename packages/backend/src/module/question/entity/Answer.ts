import { AbstractEntity } from "../../../entity/AbstractEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import { QuestionEntity } from "./Question";
import { UserEntity } from "../../user/entity/User";

@Entity({
    name: 'answer'
})
export class AnswerEntity extends AbstractEntity {

    @Column()
    answer: string

    @ManyToOne(type => UserEntity, (user) => user.answers, {
        nullable: true
    })
    user?: UserEntity

    @ManyToOne(type => QuestionEntity, (question) => question.answers)
    question: QuestionEntity

}
