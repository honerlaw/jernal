import React from 'react'
import { Container, Content } from "native-base"
import { StyleSheet } from 'react-native'
import { useGetJournalsQuery } from '../../generated/graphql'
import { HeaderNav } from './header-nav/HeaderNav'
import { Loading } from '../util/Loading'

const STYLES = StyleSheet.create({
    contentSingle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    } 
})

export const Dashboard: React.FC = () => {
    const {loading, error, data} = useGetJournalsQuery()
    if (loading) {
        return <Loading />
    }

    // right now we only support one journal
    const journal = data?.getJournals[0]
    return <Container>
        <HeaderNav />
        <Content scrollEnabled={false}>
            
        </Content>
    </Container>
}
