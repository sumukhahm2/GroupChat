import {createSlice} from '@reduxjs/toolkit'

const defaultValue={
    messages:[]
}

const ChatSlice=createSlice({
    name:'chat',
    initialState:defaultValue,
    reducers:{
         addMessages(state,action)
         {
            state.messages=state.messages.concat({message:action.payload.message,id:action.payload.id})
            //state.messages=state.messages[0].concat(action.payload)
            console.log(state.messages)
            
         },
         addAllMessages(state,action){
            //console.log(action.payload)
            state.messages=[];
            state.messages=state.messages.concat(action.payload)
            console.log(state.messages)
         }
    }
})

export const chatAction=ChatSlice.actions

export default ChatSlice.reducer