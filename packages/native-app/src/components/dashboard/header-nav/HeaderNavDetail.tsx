import React from 'react'
import { Text, View } from 'native-base'
import { StyleSheet } from 'react-native'

const STYLES = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginBottom: 4,
    },
    description: {
        fontSize: 10,
        opacity: .75
    }
})

type HeaderNavDetailProps = {
    title: string
    description: string
}

export const HeaderNavDetail: React.FC<HeaderNavDetailProps> = ({ title, description }) => {
    return <View style={STYLES.container}>
        <Text style={STYLES.title}>{title}</Text>
        <Text style={STYLES.description}>{description}</Text>
    </View>
}