import React from 'react'
import { Container, Content, View, Text } from "native-base"
import { JournalEntryFragment, useGetJournalsQuery } from '../../generated/graphql'
import { HeaderNav } from './header-nav/HeaderNav'
import { Loading } from '../util/Loading'
import { useIsFocused } from '@react-navigation/native'
import { JournalEntry } from './JournalEntry'
import format from 'date-fns/format'
import { JournalEntryHeader } from './JournalEntryHeader'

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

    const groupedEntries: { [key: string]: JournalEntryFragment[] } = {}
    journal.entries?.forEach((entry) => {
        if (!entry) {
            return
        }
        const date = format(new Date(entry.createdAt), 'MMddyyyy')
        if (!groupedEntries[date]) {
            groupedEntries[date] = []
        }
        groupedEntries[date].push(entry)
    })

    return <Container>
        <HeaderNav journalId={journal.id} entryCount={journal.entries?.length} />
        <Content>
            {Object.keys(groupedEntries).map((key) => {
                const entries = groupedEntries[key]
                return <View key={key}>
                    <JournalEntryHeader iso={entries[0].createdAt} />
                    {entries.map((entry) => {
                        return <JournalEntry key={entry.id} entry={entry} />
                    })}
                </View>
            })}
        </Content>
    </Container>
}
