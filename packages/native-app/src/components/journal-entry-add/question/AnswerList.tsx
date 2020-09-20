import { Text, View } from "native-base"
import { TouchableOpacity, StyleSheet } from "react-native"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { AnswerFragment, Maybe } from "../../../generated/graphql"
import { PRIMARY } from "../../../util/constant"

const STYLES = StyleSheet.create({
    container: {
        flex: 0,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 8
    },
    answerContainer: {
        padding: 12,
        marginRight: 8,
        marginTop: 8,
        borderRadius:16,
        backgroundColor: '#efefef'
    },
    answerSelected: {
        backgroundColor: PRIMARY
    },
    answerSelectedText: {
        color: 'white'
    }
})

type AnswerListProps = {
    answers: Array<Maybe<AnswerFragment>>
    onChange: (selected: string[]) => void
}

export const AnswerList: React.FC<AnswerListProps> = ({
    answers,
    onChange
}) => {
    const {t} = useTranslation()
    const [selected, setSelected] = useState<string[]>([])

    return <View style={STYLES.container}>
        {answers.map((answer) => {
            if (!answer) {
                return null
            }

            const onPress = () => {
                const newSelected: string[] = [...selected]
                const index = newSelected.indexOf(answer.id) 
                if (index !== -1) {
                    newSelected.splice(index, 1)
                } else {
                    newSelected.push(answer.id)
                }
                setSelected(newSelected)

                const selectedAnswers: string[] = newSelected.map((id) => {
                    const found = answers.find((answer) => answer?.id === id)
                    if (found) {
                        return t(found.answer)
                    }
                    return ''
                }).filter((answer) => answer.length > 0)

                onChange(selectedAnswers)
            }

            const isSelected = selected.indexOf(answer.id) !== -1
            const selectedContainerStyle = isSelected ? STYLES.answerSelected : undefined
            const selectedTextStyle = isSelected ? STYLES.answerSelectedText : undefined

            return <TouchableOpacity key={answer.id} onPress={onPress} style={[STYLES.answerContainer, selectedContainerStyle]}>
                <Text style={selectedTextStyle} key={answer.id}>{t(answer.answer)}</Text>
            </TouchableOpacity>
        })}        
    </View>
}
