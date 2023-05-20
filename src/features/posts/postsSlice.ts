import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from '../../store'
import { Post } from '../../models/Post'
import { deletePostRequest, fetchPostsRequest } from './postsService'

export interface PostState {
    list: Array<Post>
    isLoading: boolean
}

const initialState: PostState = {
    list: [],
    isLoading: false
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Array<Post>>) => {
            state.list = action.payload
        },
        delPost: (state, action: PayloadAction<number>)=> {
            state.list = state.list.filter(post=>post.id !== action.payload)
        },
        setIsLoading: (state, action: PayloadAction<boolean>)=> {
            state.isLoading = action.payload
        }
    }
})

export const { setPosts, delPost, setIsLoading } = postsSlice.actions

export const selectPosts = (state: AppState) => state.posts.list
export const selectIsLoading = (state: AppState) => state.posts.isLoading

export const fetchPostsAction = (userId: number): AppThunk => async (dispatch, getState) => {
    dispatch(setIsLoading(true))
    const fetchPostsResponse = await fetchPostsRequest(userId)
    dispatch(setIsLoading(false))
    if(fetchPostsResponse.isError) return alert('Server Error')
    dispatch(setPosts(fetchPostsResponse.data))
}

export const deletePostAction = (postId: number): AppThunk => async (dispatch) => {    
    dispatch(setIsLoading(true))
    const deletePostResponse = await deletePostRequest(postId)
    dispatch(setIsLoading(false))
    if(deletePostResponse.isError) return alert('Server Error')
    dispatch(delPost(postId))
}

export const preloadPostsAction = (posts: Array<Post>): AppThunk => async (dispatch) => {
    dispatch(setPosts(posts))
}

export default postsSlice.reducer
