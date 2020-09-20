import { Text, Button, Container, Content } from "native-base"
import React, { useState } from "react"
import { QuestionFragment, useGetQuestionsQuery } from "../../generated/graphql"
import { Loading } from "../util/Loading"
import { Question } from "./question/Question"
import { StyleSheet } from 'react-native'
import { PRIMARY, SIZING } from "../../util/constant"

const STYLES = StyleSheet.create({
    saveButton: {
        backgroundColor: PRIMARY,
        margin: SIZING.C
    }
})

export const JournalEntryAdd: React.FC = () => {
    const [formData, setFormData] = useState({})
    const {loading, error, data} = useGetQuestionsQuery()
    if (loading) {
        return <Loading />
    }

    const onPress = () => {
        // @todo mutation to persist this entry
    }

    const onChange = (question: QuestionFragment, value: string | string[]) => {
        const newFormData: { [key: string]: any } = {
            ...formData
        }

        const isEmptyString = typeof value === 'string' && value.trim().length === 0
        const isEmpty = value.length === 0

        if (isEmptyString || isEmpty) {
            delete newFormData[question.id]
        } else {
            newFormData[question.id] = {
                question,
                value
            }
        }

        setFormData(newFormData)
    }

    return <Container>
        <Content>
            {data?.getQuestions.map((question) => {
                if (!question || question.category === 'media' || question.category === 'location') {
                    return null
                }
                return <Question key={question.id} question={question} onChange={onChange} />
            })}
        </Content>
        <Button style={STYLES.saveButton} block onPress={onPress}>
            <Text>Save</Text>
        </Button>
    </Container>
}