import { configureStore } from '@reduxjs/toolkit'
import socketSlice from './socketSlice'
import userSlice from './userSlice'

export const store = configureStore({
    reducer: {
        userInfo:userSlice.reducer,
        socket :socketSlice.reducer
    },
})
