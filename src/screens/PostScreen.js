import React from 'react'
import { View, StyleSheet, Image, ScrollView, Alert, Dimensions } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { AppButton, AppText, AppHeaderButton } from '../components'
import { THEME } from '../theme'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBooked, removePost } from '../store/actions/postActions'

const PostScreen = ({ route, navigation }) => {
    let post = useSelector(state =>
        state.post.allPosts.find(item => item.id === route.params.postId)
    )
    if (!post) {
        post = {}
    }
    const { img, text, title, id } = post
    const dispatch = useDispatch()
    const booked = useSelector(state =>
        state.post.bookedPosts.some(item => {
            return item.id === id
        })
    )

    const onRemovePostHandler = () =>
        Alert.alert('Удаление', `Вы действительно хотите удалить пост №${id}`, [
            { text: 'Отмена', style: 'cancel' },
            {
                text: 'Удалить',
                onPress: () => {
                    navigation.goBack()
                    dispatch(removePost(id))
                },
                style: 'destructive',
            },
        ])

    navigation.setOptions({
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
                <Item
                    iconName={booked ? 'ios-star' : 'ios-star-outline'}
                    title="Take a post"
                    onPress={() => dispatch(toggleBooked(post))}
                />
            </HeaderButtons>
        ),
    })

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{ uri: img }} />
            <ScrollView style={styles.contentBlock}>
                <AppText style={styles.title}>{title}</AppText>
                <View style={styles.textWrapper}>
                    <AppText style={styles.text}>{text}</AppText>
                </View>
            </ScrollView>
            <AppButton
                style={styles.removeBtn}
                onPress={() => onRemovePostHandler(id)}
                color={THEME.DANGER_COLOR}
            >
                Удалить
            </AppButton>
        </View>
    )
}

export default PostScreen

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 20,
    },
    img: {
        width: width - 20,
        height: (width * 9) / 16,
        resizeMode: 'cover',
        backgroundColor: 'gray',
        marginBottom: 20,
        borderRadius: 3,
    },
    title: {
        fontSize: 28,
        fontFamily: 'open-bold',
        color: THEME.MAIN_COLOR,
        textAlign: 'center',
    },
    contentBlock: {
        flex: 1,
        padding: 10,
        width: '100%',
    },
    text: {},
    textWrapper: {
        marginTop: 15,
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        elevation: 30,
    },
    removeBtn: {
        width: '70%',
    },
})
