import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppText } from '../components'
import { THEME } from '../theme'

const AboutScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <AppText style={styles.text}>
                Это моё первое тестовое приложение на React Native.
            </AppText>
            <AppText>
                Версия приложения <AppText style={styles.version}>1.0.0</AppText>
            </AppText>
        </View>
    )
}

export default AboutScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
    },
    version: {
        fontFamily: 'open-bold',
        color: THEME.MAIN_COLOR,
    },
})
