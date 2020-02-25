import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const AppButton = ({ children, color, style, onPress, disabled }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.7}
            onPress={onPress}
            style={{ ...styles.button, backgroundColor: color, ...style }}
        >
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'open-regular',
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
})
