import React from "react"
import { View, Text } from "native-base"
import { StyleSheet } from "react-native"
import { SIZING } from "../../util/constant"

const STYLES = StyleSheet.create({
    text: {
        fontSize: SIZING.D + SIZING.C,
        fontWeight: 'bold',
        margin: SIZING.C
    }
})

export const Title: React.FC = () => {
    return <View>
        <Text style={STYLES.text}>jernal</Text>
    </View>
}