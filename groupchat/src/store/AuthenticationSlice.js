import { createSlice } from "@reduxjs/toolkit";



const defaultValues={
    isLogin:localStorage.getItem('token')===null?false:true
   
}


const AuthenticationSlice=createSlice({
    name:'auth',
    initialState:defaultValues,
    reducers:{
          signIn(state,action){
            
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('messages',JSON.stringify({message:null,id:0}))
            localStorage.setItem('phone',action.payload.phone)
             state.isLogin=true
            
          },
          keepLogin(state,action){
            console.log('keep login')
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
             state.isLogin=true
          },
          logout(state){
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            localStorage.removeItem('message')
            localStorage.removeItem('phone')
            state.isLogin=false
          }

    }
})



export const authAction=AuthenticationSlice.actions

export default AuthenticationSlice.reducer