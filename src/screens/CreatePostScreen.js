import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { AppButton, PhotoPicker } from '../components'
import { THEME } from '../theme'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { createPost } from '../store/actions/postActions'

const CreatePostScreen = ({ navigation }) => {
    const [titleValue, setTitleValue] = useState('')
    const [textValue, setTextValue] = useState('')
    const [img, setImg] = useState(null)
    const dispatch = useDispatch()

    const createHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: textValue,
            img: img,
            title: titleValue,
        }
        dispatch(createPost(post))
        setTextValue('')
        setTitleValue('')
        setImg(null)
        navigation.navigate('Main')
    }
    const imagePickerHandler = uri => {
        setImg(uri)
    }

    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Введите заголовок заметки"
                    value={titleValue}
                    onChangeText={setTitleValue}
                    maxLength={40}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Введите текст заметки"
                    value={textValue}
                    onChangeText={setTextValue}
                    multiline
                />
                <PhotoPicker image={img} imagePickerHandler={imagePickerHandler} />
                <AppButton
                    style={styles.button}
                    onPress={createHandler}
                    color={THEME.MAIN_COLOR}
                    disabled={!textValue || !titleValue || !img}
                >
                    Создать
                </AppButton>
            </View>
        </ScrollView>
    )
}

export default CreatePostScreen
const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        paddingTop: 25,
        alignItems: 'center',
    },

    textInput: {
        marginBottom: 25,
        textAlign: 'left',
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        paddingTop: 15,
        borderRadius: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 3 },
        elevation: 8,
    },
    img: {
        width: '100%',
        height: 200,
    },
    button: {
        marginTop: 20,
        width: '70%',
    },
})
