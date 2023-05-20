import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from './features/counter/counterSlice'
import usersReducer from './features/users/usersSlice'
import authReducer from './features/auth/authSlice'
import postsReducer from './features/posts/postsSlice' 

export function makeStore() {
  return configureStore({
    reducer: { 
      counter: counterReducer ,
      users: usersReducer,
      auth: authReducer,
      posts: postsReducer
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
