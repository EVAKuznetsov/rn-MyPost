import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import Post from './Post'
import AppText from './ui/AppText'

const PostList = ({ listData, onOpenPost }) => {
    return (
        <View style={styles.container}>
            {listData.length ? (
                <FlatList
                    style={styles.contentList}
                    data={listData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post item={item} onOpenPost={onOpenPost} />}
                />
            ) : (
                <AppText>Постов ещё нет</AppText>
            )}
        </View>
    )
}

export default PostList
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentList: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flex: 1,
        alignSelf: 'stretch',
    },
})
