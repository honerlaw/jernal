import React from 'react'
import {TouchableOpacity} from 'react-native'
import Settings from '../../../assets/settings.svg'

type HeaderSettingsButtonProps = {
    navigation: any
    tintColor?: string // passed from react navigation
}

export const HeaderSettingsButton: React.FC<HeaderSettingsButtonProps> = ({
    navigation
}) => {
    const onPress = () => {
        navigation.navigate('settings')
    }

    return <TouchableOpacity onPress={onPress}>
        <Settings width={32} height={32} />
    </TouchableOpacity>
}
