import {configureStore} from '@reduxjs/toolkit'
import userAuth from './userAuth'


const store = configureStore(
    {reducer:{userInfo:userAuth.reducer}}
);

export default store;