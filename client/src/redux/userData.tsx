import { createSlice } from "@reduxjs/toolkit";


const userData = createSlice({
    name:'userData',
    initialState :{
        user:null,
    },

    reducers:{
        userDetails(state,action){
            const newData = action.payload;
            state.user = newData.user;
        }
    }

})

export const userActions = userData.actions;
export default userData;