import { Text, View } from "native-base"
import React from "react"
import { StyleSheet } from "react-native"
import { JournalEntryFragment } from "../../generated/graphql"
import { SIZING } from "../../util/constant"

const STYLES = StyleSheet.create({
    container: {
        margin: SIZING.C
    }
})

type JournalEntryProps = {
    entry: JournalEntryFragment
}

export const JournalEntry: React.FC<JournalEntryProps> = ({entry}) => {
    return <View style={STYLES.container}>
        {entry?.questions.map((question) => {
            return <Text key={question.answer}>{question.answer}</Text>
        })}
    </View>
}
