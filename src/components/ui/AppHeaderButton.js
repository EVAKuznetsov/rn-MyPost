import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Platform } from 'react-native'
import { THEME } from '../../theme'

const AppHeaderButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={25}
            color={Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'}
        />
    )
}

export default AppHeaderButton
