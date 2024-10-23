import {createSlice} from '@reduxjs/toolkit'

const defaultValue={
    messages:[],
    groupnames:[],
    invites:[]
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
         },
         addGroup(state,action){
            state.groupnames=state.groupnames.concat(action.payload.groupName)
         },
         addAllGroups(state,action){
            state.groupnames=[];
            state.groupnames=state.groupnames.concat(action.payload)
         },
         addAllInvites(state,action)
         {
            state.invites=state.invites.concat(action.payload)
         }
    }
})

export const chatAction=ChatSlice.actions

export default ChatSlice.reducer