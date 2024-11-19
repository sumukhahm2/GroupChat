import {configureStore} from '@reduxjs/toolkit'
import authenticationSlice from './AuthenticationSlice'
import contactSlice from './ContactSlice'
import chatSlice from './ChatSlice'
import io from 'socket.io-client';
import { chatAction } from './ChatSlice';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorageUtil';

const preloadedState = loadFromLocalStorage();

const store=configureStore({
    reducer:{auth:authenticationSlice,chat:chatSlice,contact:contactSlice},
    preloadedState,
})

store.subscribe(() => {
    const chatState = store.getState().chat; 
    console.log(chatState)// Save only the `chat` slice
    saveToLocalStorage({ chat: chatState });
});

export default store


