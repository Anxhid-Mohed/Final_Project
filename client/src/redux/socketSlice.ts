import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

export const socketSlice = createSlice({
    name: 'Socket',
    initialState: {
        socket: null
    },

    reducers: {
        socketDetails:(state,action) => {
            state.socket = action.payload
        }
    }
})

export const { socketDetails } = socketSlice.actions
export default socketSlice;