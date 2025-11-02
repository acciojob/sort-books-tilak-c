import {configureStore} from '@reduxjs/toolkit';
import bookReducer from './components/Books/bookSlice'
export const store=configureStore({
    reducer:{
        book:bookReducer
    }
})
