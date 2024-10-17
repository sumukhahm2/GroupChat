import { createSlice } from "@reduxjs/toolkit";



const defaultValues={
    isLogin:localStorage.getItem('token')?true:false,
   
}


const AuthenticationSlice=createSlice({
    name:'auth',
    initialState:defaultValues,
    reducers:{
          signIn(state,action){
            
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('messages',[])
             state.isLogin=true
            
          },
          keepLogin(state,action){
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
             state.isLogin=true
          }

    }
})



export const authAction=AuthenticationSlice.actions

export default AuthenticationSlice.reducer