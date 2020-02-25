import React from 'react'
import { useSelector } from 'react-redux'

import { PostList } from '../components'

const BookScreen = ({ navigation }) => {
    const bookedPosts = useSelector(state => state.post.bookedPosts)
    const onOpenPostHandler = (id, postDate, booked) => {
        navigation.navigate('PostBooked', { postId: id, postDate, booked })
    }
    return <PostList onOpenPost={onOpenPostHandler} listData={bookedPosts} />
}

export default BookScreen
