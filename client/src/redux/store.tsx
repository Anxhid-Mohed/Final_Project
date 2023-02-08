import {configureStore} from '@reduxjs/toolkit'
import  userData  from '../redux/userData'


const store = configureStore(
    {reducer:{userData:userData.reducer}}
);

export default store;