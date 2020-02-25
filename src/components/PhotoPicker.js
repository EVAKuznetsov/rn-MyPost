import React from 'react'
import { View, StyleSheet, Image, Alert, Dimensions } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AppButton from './ui/AppButton'
import { THEME } from '../theme'

async function askForPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
        Alert.alert('Ошибка!', 'Ва не дали согласие на доступ проиложения к камере')
        return false
    }
    return true
}
const { width } = Dimensions.get('screen')
const PhotoPicker = ({ image, imagePickerHandler }) => {
    const takePhoto = async fromCamera => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return
        }
        const imgSettings = { quality: 0.7, allowsEditing: false, aspect: [16, 9] }

        const img = fromCamera
            ? await ImagePicker.launchCameraAsync({ imgSettings })
            : await ImagePicker.launchImageLibraryAsync({ imgSettings })

        if (img.cancelled) {
            return
        }
        imagePickerHandler(img.uri)
    }
    const imageT = image ? (
        <Image style={styles.img} source={{ uri: image }} />
    ) : (
        <Image style={styles.img} source={require('../../assets/waitImg.jpg')} />
    )
    return (
        <View style={styles.wrapper}>
            {/* {image && <Image style={styles.img} source={{ uri: image }} />} */}
            {imageT}
            <View style={styles.buttonWrap}>
                <AppButton
                    style={styles.button}
                    color={THEME.MAIN_COLOR}
                    onPress={() => takePhoto(false)}
                >
                    <Ionicons name="ios-albums" size={30} />
                </AppButton>
                <AppButton
                    style={styles.button}
                    color={THEME.MAIN_COLOR}
                    onPress={() => takePhoto(true)}
                >
                    <Ionicons name="md-camera" size={30} />
                </AppButton>
            </View>
        </View>
    )
}

export default PhotoPicker

const styles = StyleSheet.create({
    wrapper: {
        width: width,
        flex: 1,
        alignItems: 'center',
    },
    buttonWrap: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        width: '48%',
        marginTop: 20,
    },
    img: {
        width: width - 20,
        height: (width * 9) / 16,
        backgroundColor: 'gray',
    },
})
