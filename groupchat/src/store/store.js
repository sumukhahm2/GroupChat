import {configureStore} from '@reduxjs/toolkit'
import authenticationSlice from './AuthenticationSlice'
import contactSlice from './ContactSlice'
import chatSlice from './ChatSlice'
import io from 'socket.io-client';
import { chatAction } from './ChatSlice';
const store=configureStore({
    reducer:{auth:authenticationSlice,chat:chatSlice,contact:contactSlice}
})

export default store


