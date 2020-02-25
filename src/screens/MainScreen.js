import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

import { PostList } from '../components'
import { loadPosts } from '../store/actions/postActions'
import { THEME } from '../theme'

const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { allPosts, isLoading } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])
    const onOpenPostHandler = (id, postDate, booked) => {
        navigation.navigate('Post', { postId: id, postDate, booked })
    }
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={THEME.MAIN_COLOR} size="large" />
            </View>
        )
    }
    return <PostList onOpenPost={onOpenPostHandler} listData={allPosts} />
}
export default MainScreen
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
