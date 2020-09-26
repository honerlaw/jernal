import format from "date-fns/format"
import { StyleSheet } from "react-native"
import { View, Text } from "native-base"
import React from "react"
import { SIZING } from "../../util/constant"

const STYLES = StyleSheet.create({
    container: {
        margin: SIZING.C,
        marginBottom: SIZING.A
    },
    day: {
        fontSize: SIZING.C + SIZING.B,
        fontWeight: '500'
    },
    date: {
        fontSize: SIZING.C + SIZING.A,
        fontWeight: '500'
    }
})

type JournalEntryHeaderProps = {
    iso: string
}

export const JournalEntryHeader: React.FC<JournalEntryHeaderProps> = ({
    iso
}) => {
    return <View style={STYLES.container}>
        <Text style={STYLES.day}>
            {format(new Date(iso), 'EEEE')}
        </Text>
        <Text style={STYLES.date}>
            {format(new Date(iso), 'PPP')}
        </Text>
    </View>
}