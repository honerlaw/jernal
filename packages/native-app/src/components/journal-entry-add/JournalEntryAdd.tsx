import { Text, Button, Container, Content, Toast } from "native-base"
import React, { useState } from "react"
import { GetJournalsDocument, QuestionFragment, useCreateJournalEntryMutation, useGetQuestionsQuery } from "../../generated/graphql"
import { Loading } from "../util/Loading"
import { Question } from "./question/Question"
import { StyleSheet } from 'react-native'
import { PRIMARY, SIZING } from "../../util/constant"
import { useTranslation } from "react-i18next"
import { useNavigation, useNavigationState } from "@react-navigation/native"
import { Source } from "graphql"

const STYLES = StyleSheet.create({
    saveButton: {
        backgroundColor: PRIMARY,
        margin: SIZING.C
    },
    saveButtonDisabled: {
        opacity: .5,
        backgroundColor: '#afafaf'
    }
})

type QuestionFormData = {
    question: QuestionFragment,
    value: string
}

export const JournalEntryAdd: React.FC = () => {
    const [formData, setFormData] = useState<{ [key: string]: QuestionFormData }>({})
    const {loading, error, data} = useGetQuestionsQuery()
    const [createJournalEntry, { loading: mutationLoading }] = useCreateJournalEntryMutation()
    const {t} = useTranslation()
    const navigation = useNavigation()
    const params: { journalId: string } | undefined = useNavigationState((state) => state.routes[state.index].params as any)
    if (loading) {
        return <Loading />
    }

    if (!params) {
        navigation.goBack()
        return null
    }

    const onPress = async () => {
        try {
            await createJournalEntry({
                variables: {
                    input: {
                        journalId: params.journalId,
                        questions: Object.keys(formData).map((id) => {
                            const data: QuestionFormData = formData[id]
                            return {
                                question: data.question.id,
                                answer: data.value
                            }
                        })
                    }
                },
                refetchQueries: ['getJournals'],
                awaitRefetchQueries: true
            })
            navigation.goBack()
        } catch(err) {
            Toast.show({
                position: 'bottom',
                text: t([err.message, 'error.unknown']),
                type: 'danger',
                duration: 3500
            })
        }
    }

    const onChange = (question: QuestionFragment, value: string | string[]) => {
        const newFormData: { [key: string]: QuestionFormData } = {
            ...formData
        }

        const stringValue: string = Array.isArray(value) ? value.join(', ') : value
        if (stringValue.trim().length === 0) {
            delete newFormData[question.id]
        } else {
            newFormData[question.id] = {
                question,
                value: stringValue
            }
        }

        setFormData(newFormData)
    }

    const isDisabled = Object.keys(formData).length === 0

    return <Container>
        <Content>
            {data?.getQuestions.map((question) => {
                if (!question || question.category === 'media' || question.category === 'location') {
                    return null
                }
                return <Question key={question.id} question={question} onChange={onChange} />
            })}
        </Content>
        <Button style={[STYLES.saveButton, isDisabled ? STYLES.saveButtonDisabled : undefined]} block onPress={onPress} disabled={isDisabled}>
            <Text>{mutationLoading ? 'Saving...' : 'Save'}</Text>
        </Button>
    </Container>
}