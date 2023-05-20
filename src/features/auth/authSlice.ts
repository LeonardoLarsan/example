import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from '../../store'
import { loginRequest } from './authService'
import { delToken, setToken } from '../../utils/apiConfigUtil'

interface LoginState {
    token: string
    isLoading: boolean
}

const initialState: LoginState = {
    token: '',
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>)=> {
            state.token = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>)=> {
            state.isLoading = action.payload
        }
    }
})

export const { setIsLoading } = authSlice.actions

export const selectToken = (state: AppState) => state.auth.token
export const selectIsLoading = (state: AppState) => state.auth.isLoading

export const loginAction = (data: {email: string, password: string}, redirectTo: (route: string)=> void): AppThunk => async (dispatch, getState) => {
    dispatch(setIsLoading(true))
    const response = await loginRequest({email: data.email, password: data.password})
    dispatch(setIsLoading(false))

    if(response.isError && response.status === 400) {
        alert("Failed authentication");
        return
    }

    if(response.isError){
        alert("Error");
        return
    }

    setToken(response.data.token)
    redirectTo('/users?page=1')
}

export const signOutAction = (redirectTo: Function): AppThunk => async (dispatch, getState) => {
    delToken()
    redirectTo('/login')
}

export default authSlice.reducer


