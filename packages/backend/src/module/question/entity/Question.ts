import { AbstractEntity } from "../../../entity/AbstractEntity";
import { Entity, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { AnswerEntity } from "./Answer";
import { UserEntity } from "../../user/entity/User";

@Entity({
    name: 'question'
})
export class QuestionEntity extends AbstractEntity {

    @Column()
    question: string

    @Column()
    category: string

    @Column({
        nullable: true,
        default: null
    })
    order: number

    @ManyToOne(type => UserEntity, (user) => user.answers, {
        eager: true,
        nullable: true
    })
    user?: UserEntity

    @OneToMany(type => AnswerEntity, answer => answer.question, {
        eager: true,
        nullable: true
    })
    answers?: AnswerEntity[]

}