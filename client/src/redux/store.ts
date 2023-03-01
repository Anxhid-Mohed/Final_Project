import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './notificationSlice'
import socketSlice from './socketSlice'
import userSlice from './userSlice'

export const store = configureStore({
    reducer: {
        userInfo:userSlice.reducer,
        userNotifications:notificationSlice.reducer,
        socket :socketSlice.reducer,
    },
})
