import * as FileSystem from 'expo-file-system'
import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, CREATE_POST } from '../types'
import { DB } from '../../db'

export const loadPosts = () => {
    return async dispatch => {
        const posts = await DB.getPosts()
        dispatch({ type: LOAD_POSTS, payload: posts })
    }
}
export const toggleBooked = post => async dispatch => {
    const booked = post.booked ? 0 : 1
    await DB.updatePost(post.id, booked)
    dispatch({ type: TOGGLE_BOOKED, id: post.id })
}
export const removePost = id => async dispatch => {
    await DB.removePost(id)
    dispatch({ type: REMOVE_POST, id })
}

export const createPost = post => async dispatch => {
    const fileName = post.img.split('/').pop()
    const imgPath = FileSystem.documentDirectory + fileName
    try {
        FileSystem.moveAsync({
            to: imgPath,
            from: post.img,
        })
    } catch (error) {
        console.error(error)
    }
    const payload = { ...post, img: imgPath }
    payload.id = await DB.addPost(payload)

    dispatch({ type: CREATE_POST, payload })
}
