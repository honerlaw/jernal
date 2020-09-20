import { Text, View } from "native-base"
import React from "react"
import { StyleSheet } from 'react-native'
import { useTranslation } from "react-i18next"
import { QuestionFragment } from "../../../generated/graphql"
import { AnswerList } from "./AnswerList"
import { AnswerFreeForm } from "./AnswerFreeForm"
import { SIZING } from "../../../util/constant"
import { onChange } from "react-native-reanimated"

const STYLES = StyleSheet.create({
    container: {
        margin: SIZING.C
    },
    title: {
        fontSize: 18,
        fontWeight: '500'
    }
})

type QuestionProps = {
    question: QuestionFragment,
    onChange: (question: QuestionFragment, value: string | string[]) => void
}

export const Question: React.FC<QuestionProps> = ({
    question,
    onChange
}) => {
    const {t} = useTranslation()

    return <View style={STYLES.container}>
        <Text style={STYLES.title}>{t(question.question)}</Text>
        {question.category === 'list' && question.answers && <AnswerList answers={question.answers} onChange={(selected, ) => onChange(question, selected)} /> }
        {question.category === 'free-form' && <AnswerFreeForm onChange={(text) => onChange(question, text)} />}
    </View>
}
