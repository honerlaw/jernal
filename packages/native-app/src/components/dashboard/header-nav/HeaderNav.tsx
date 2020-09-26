import React from 'react'
import { View } from 'native-base'
import { StyleSheet } from "react-native"
import Add from '../../../../assets/add.svg'
import { HeaderNavDetail } from './HeaderNavDetail'
import { HeaderNavIconButton } from './HeaderNavIconButton'
import { useNavigation } from '@react-navigation/native'
import { SIZING } from '../../../util/constant'

const STYLES = StyleSheet.create({
    container: {
        flex: 0,
        padding: SIZING.C
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    }
})

type HeaderNavProps = {
    journalId: string
    entryCount?: number
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
    journalId,
    entryCount
}) => {
    const navigator = useNavigation()

    return <View style={STYLES.container}>
        <View style={STYLES.detailContainer}>
            <HeaderNavDetail title={entryCount?.toFixed() || '0'} description={'entries'} />

            <View style={STYLES.buttonContainer}>
                <HeaderNavIconButton icon={Add} onPress={() => navigator.navigate('journal-entry-add', { journalId })} />
            </View>
        </View>
    </View>
}