import React from 'react'
import { Container, Content } from "native-base"
import { StyleSheet, Text } from 'react-native'

const STYLES = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const Loading: React.FC = () => {
    return <Container>
        <Content scrollEnabled={false} contentContainerStyle={STYLES.content}>
            <Text>Loading!</Text>
        </Content>
    </Container>
}