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


export const socket = io('http://localhost:4000');


socket.on('connect', () => {
  console.log('Connected to socket server with ID:', socket.id);
});




socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });