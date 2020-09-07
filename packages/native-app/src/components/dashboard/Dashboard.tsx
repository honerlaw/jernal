import React from 'react'
import { Container, Content } from "native-base"
import { Text } from 'react-native'
import { useGetJournalsQuery } from '../../generated/graphql'

export const Dashboard: React.FC = () => {
    const {loading, error, data} = useGetJournalsQuery()
    if (loading) {
        return <Container>
            <Content>
                <Text>Loading!</Text>
            </Content>
        </Container>
    }

    return <Container>
        <Content>
            <Text>Hello</Text>
        </Content>
    </Container>
}
