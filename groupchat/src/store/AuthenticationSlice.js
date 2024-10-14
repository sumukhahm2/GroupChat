import { createSlice } from "@reduxjs/toolkit";



const defaultValues={
    isLogin:false,
    userEmail:null,
    userToken:null
}


const AuthenticationSlice=createSlice({
    name:'auth',
    initialState:defaultValues,
    reducers:{
          signIn(state,action){
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
             state.isLogin=true
             state.userEmail=action.payload.email
             state.userToken=action.payload.token
          }

    }
})



export const authAction=AuthenticationSlice.actions

export default AuthenticationSlice.reducer