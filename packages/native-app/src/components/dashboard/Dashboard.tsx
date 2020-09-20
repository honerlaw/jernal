import React from 'react'
import { Container, Content } from "native-base"
import { useGetJournalsQuery } from '../../generated/graphql'
import { HeaderNav } from './header-nav/HeaderNav'
import { Loading } from '../util/Loading'
import { useIsFocused } from '@react-navigation/native'
import { JournalEntry } from './JournalEntry'

export const Dashboard: React.FC = () => {
    // basically, we just use this to trigger a re-render of this page
    // when the user navigates back from another page
    // this way the query is re-run against the updated cache and we get
    // the latest entries
    useIsFocused()

    const {loading, error, data} = useGetJournalsQuery()
    if (loading) {
        return <Loading />
    }

    // right now we only support one journal
    const journal = data?.getJournals[0]
    if (!journal) {
        return null
    }

    return <Container>
        <HeaderNav journalId={journal.id} />
        <Content>
            {journal.entries?.map((entry) => {
                if (!entry) {
                    return null
                }
                return <JournalEntry key={entry.id} entry={entry} />
            })}
        </Content>
    </Container>
}
