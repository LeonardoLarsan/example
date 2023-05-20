import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../store'
import { fetchUserListRequest, updateUserRequest } from './usersService'
import { User } from '../../models/User'

export interface UsersState {
    list: Array<User>
    isLoading: boolean
    totalPages: number
    currentPage: number
}

const initialState: UsersState = {
    list: [],
    isLoading: false,
    totalPages: 0,
    currentPage: 0,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<Array<User>>) => {
            state.list = action.payload
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.list = state.list.map(user => user.id === action.payload.id ? action.payload : user)
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const { setList, setIsLoading, setTotalPages, setCurrentPage, updateUser } = usersSlice.actions

export const selectUsers = (state: AppState) => state.users.list
export const selectTotalPages = (state: AppState) => state.users.totalPages
export const selectCurrentPage = (state: AppState) => state.users.currentPage
export const selectIsLoading = (state: AppState) => state.users.isLoading

export const fetchUserListAction = (currentPage: number): AppThunk => async (dispatch) => {

    dispatch(setIsLoading(true))
    const response = await fetchUserListRequest(currentPage)
    dispatch(setIsLoading(false))

    if (response.isError) {
        alert('Server Error')
        return
    }

    dispatch(setList(response.data.data))
    dispatch(setTotalPages(response.data.total_pages))
    dispatch(setCurrentPage(response.data.page))

}

export const updateUserAction = (user: User): AppThunk => async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await updateUserRequest(user)
    dispatch(setIsLoading(false))

    if (response.isError) {
        alert('Server Error')
        return
    }

    dispatch(updateUser(user))
}

export const preloadUsersAction = (users: Array<User>): AppThunk => async (dispatch) => {
    dispatch(setList(users))
} 

export default usersSlice.reducer
