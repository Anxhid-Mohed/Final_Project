import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'Notification',
    initialState: {
        notifications:null
    },

    reducers:{
        userNotification:(state,action) =>{
            state.notifications = action.payload;
        }
    }
})

export const { userNotification } = notificationSlice.actions
export default notificationSlice;