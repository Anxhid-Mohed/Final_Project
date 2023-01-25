import { createSlice } from "@reduxjs/toolkit";


const userAuth = createSlice({
    name:'signup',
    initialState :{
        user:null,
    },

    reducers:{
        userSignupDetails(state,action){
            const newData = action.payload;
            state.user = newData.user;
        }
    }

})

export const userActions = userAuth.actions;
export default userAuth;