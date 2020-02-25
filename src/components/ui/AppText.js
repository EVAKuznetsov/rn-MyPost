import React from 'react'
import { Text, StyleSheet } from 'react-native'

const AppText = ({ children, style = {} }) => (
    <Text style={{ ...styles.text, ...style }}>{children}</Text>
)

export default AppText
const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-regular',
        fontSize: 18,
    },
})
