import { fromUnixTime } from "date-fns/esm"
import format from "date-fns/format"
import { Text, View } from "native-base"
import React from "react"
import { StyleSheet } from "react-native"
import { JournalEntryFragment } from "../../generated/graphql"
import { PRIMARY, SIZING } from "../../util/constant"

const STYLES = StyleSheet.create({
    container: {
        margin: SIZING.C,
        borderLeftColor: PRIMARY,
        borderLeftWidth: SIZING.A,
        padding: SIZING.B
    },
    time: {
        fontSize: SIZING.C,
        marginRight: SIZING.C,
        marginTop: SIZING.B,
        marginBottom: SIZING.B
    },

    listContainer: {
        flex: 0,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center'
    },
    list: {
        padding: SIZING.B,
        marginRight: SIZING.B,
        marginTop: SIZING.B,
        borderRadius: SIZING.D,
        backgroundColor: '#efefef'
    },
    listText: {
        fontSize: SIZING.B + SIZING.A,
        color: 'black'
    },

    freeForm: {
        marginTop: SIZING.A
    }
})

type JournalEntryProps = {
    entry: JournalEntryFragment
}

export const JournalEntry: React.FC<JournalEntryProps> = ({entry}) => {

    return <View style={STYLES.container}>
        <View style={STYLES.listContainer}>
            <View>
                <Text style={STYLES.time}>{format(new Date(entry.createdAt), 'h:mm a')}</Text>
            </View>
            {entry?.questions.map((question) => {
                if (question.question.category === 'list') {

                    const answers = question.answer.split(', ')
                    return answers.map((answer) => {
                        return <View style={STYLES.list} key={`${question.id}-${answer}`}>
                            <Text style={STYLES.listText}>{answer}</Text>
                        </View>
                    })
                }
                return null
            })}
        </View>
        <View>
            {entry?.questions.map((question) => {
                if (question.question.category === 'free-form') {
                    return <View style={STYLES.freeForm} key={question.answer}>
                        <Text>
                            {question.answer}
                        </Text>
                    </View>
                }
                return null
            })}
        </View>
    </View>
}
