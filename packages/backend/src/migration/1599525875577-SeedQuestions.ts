import {MigrationInterface, QueryRunner} from "typeorm";
import questions from '../data/questions'
import { QuestionEntity } from "../module/question/entity/Question";
import { AnswerEntity } from "src/module/question/entity/Answer";

export class SeedQuestions1599525875577 implements MigrationInterface {

    public async up(runner: QueryRunner): Promise<void> {
        for (let i = 0; i < questions.length; ++i) {
            const question = questions[i]

            await runner.manager.insert(QuestionEntity, {
                id: question.id,
                order: i,
                category: question.category,
                question: question.question
            })

            const foundQuestion = await runner.manager.findOne(QuestionEntity, {
                where: {
                    id: question.id
                }
            })

            if (!foundQuestion) {
                throw new Error('Could not find inserted question.')
            }

            // special type of question that doesn't require specific answers
            if (!question.answers) {
                continue
            }

            for (const answer of question.answers) {
                await runner.manager.insert(AnswerEntity, {
                    id: answer.id,
                    answer: answer.answer,
                    question
                })
            }
        }
    }

    public async down(runner: QueryRunner): Promise<void> {
        const answerIds = questions.map((question) => {
            return question.answers?.map((answer) => {
                return answer.id
            }) || []
        }).reduce((a, b) => a.concat(b), [])
        const questionIds = questions.map((question) => question.id)

        await runner.manager.delete(AnswerEntity, answerIds)
        await runner.manager.delete(QuestionEntity, questionIds)
    }

}
