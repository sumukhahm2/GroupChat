import { createSlice } from "@reduxjs/toolkit";



const defaultValues={
    isLogin:false,
}


const AuthenticationSlice=createSlice({
    name:'auth',
    initialState:defaultValues,
    reducers:{
          signIn(state,action){
            
            localStorage.setItem('email',action.payload.email)
            localStorage.setItem('token',action.payload.token)
             state.isLogin=true
            
          }

    }
})



export const authAction=AuthenticationSlice.actions

export default AuthenticationSlice.reducer