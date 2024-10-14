import {configureStore} from '@reduxjs/toolkit'
import authenticationSlice from './AuthenticationSlice'

const store=configureStore({
    reducer:{auth:authenticationSlice}
})

export default store