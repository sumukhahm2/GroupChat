import {configureStore} from '@reduxjs/toolkit'
import authenticationSlice from './AuthenticationSlice'
import chatSlice from './ChatSlice'

const store=configureStore({
    reducer:{auth:authenticationSlice,chat:chatSlice}
})

export default store