import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, CREATE_POST } from '../types'

const initialState = {
    allPosts: [],
    bookedPosts: [],
    isLoading: true,
}
const handlers = {
    [LOAD_POSTS]: (state, { payload }) => ({
        ...state,
        allPosts: payload,
        bookedPosts: payload.filter(post => post.booked),
        isLoading: false,
    }),
    [TOGGLE_BOOKED]: (state, { id }) => {
        const allPosts = state.allPosts.map(post => ({
            ...post,
            booked: post.id === id ? !post.booked : post.booked,
        }))

        return { ...state, allPosts, bookedPosts: allPosts.filter(post => post.booked) }
    },
    [REMOVE_POST]: (state, { id }) => {
        const allPosts = state.allPosts.filter(post => post.id !== id)
        return { ...state, allPosts, bookedPosts: allPosts.filter(post => post.booked) }
    },
    [CREATE_POST]: (state, { payload }) => {
        return { ...state, allPosts: [{ ...payload }, ...state.allPosts] }
    },
    DEFAULT: state => state,
}
export default (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
