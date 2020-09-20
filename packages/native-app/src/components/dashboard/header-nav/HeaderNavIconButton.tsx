import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SIZING } from '../../../util/constant'

const STYLES = StyleSheet.create({
    container: {
        marginLeft: SIZING.C
    }
})

type HeaderNavIconButtonProps = {
    icon: React.ComponentType<any>
    onPress: () => void
}

export const HeaderNavIconButton: React.FC<HeaderNavIconButtonProps> = ({
    icon: Icon,
    onPress
}) => {
    return <TouchableOpacity style={STYLES.container} onPress={onPress}>
        <Icon width={32} height={32} />
    </TouchableOpacity>
}
