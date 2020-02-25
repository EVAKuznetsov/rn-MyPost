import React from 'react'
import { View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import AppText from './ui/AppText'

const Post = ({ item, onOpenPost }) => {
    const { id, title, img, date, booked } = item
    return (
        <TouchableOpacity
            style={styles.post}
            onPress={() => onOpenPost(id, date, booked)}
            activeOpacity={0.8}
        >
            <ImageBackground style={styles.img} source={{ uri: img }}>
                <View style={styles.postWrap}>
                    <AppText style={styles.text}>{title}</AppText>
                    <AppText style={styles.date}>{new Date(date).toLocaleDateString()}</AppText>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default Post

const styles = StyleSheet.create({
    post: {
        alignSelf: 'stretch',
        marginBottom: 20,
        shadowColor: 'rgba(0,0,0,1)',
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        elevation: 10,
    },
    img: {
        alignSelf: 'stretch',
        height: 200,
        padding: 10,
        overflow: 'hidden',

        backgroundColor: 'gray',
    },
    postWrap: {
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 3,
        textShadowOffset: { width: 2, height: 2 },
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'open-bold',
    },
    date: {
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 3,
        textShadowOffset: { width: 2, height: 2 },
        fontSize: 20,
        alignSelf: 'flex-end',
    },
})
