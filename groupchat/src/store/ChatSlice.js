import {createSlice} from '@reduxjs/toolkit'

const defaultValue={
    messages:[],
    groupnames:[],
    invites:[],
    groupdetails:[],
    members:[]
    
}

const ChatSlice=createSlice({
    name:'chat',
    initialState:defaultValue,
    reducers:{
         addMessages(state,action)
         {
            console.log(state.messages)
            state.messages=state.messages.concat(action.payload)
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
            console.log(action.payload)
            state.groupnames=state.groupnames.concat(action.payload)
         },
         addAllGroups(state,action){
            state.groupnames=[];
            state.groupnames=state.groupnames.concat(action.payload)
         },
         addAllInvites(state,action)
         {
            state.invites=state.invites.concat(action.payload)
         },
         addMember(state,action){
            state.groupdetails=state.groupdetails.concat(action.payload)
         },
         addGroupDetails(state,action)
         {
            state.groupdetails=[]
           state.groupdetails=state.groupdetails.concat(action.payload)
           console.log(state.groupdetails)
         },
         updateGroupDetails(state,action){
            const index=state.groupdetails.findIndex(item=>item.authId===action.payload.id)
            console.log(index)
            const user=state.groupdetails[index]
            console.log(user)
            if(action.payload.type==='update-admin')
           { 
            const updatedGroup={...user,isAdmin:!user.isAdmin}
            state.groupdetails[index]=updatedGroup
            console.log(state.groupdetails)
           }
           if(action.payload.type==='update-member')
           {
            const updatedGroup={...user,isMember:false}
            state.groupdetails[index]=updatedGroup
            console.log(state.groupdetails)
           }
         },
         joinMembers(state,action){
            state.members=state.members.concat(action.payload)
         }
    }
})

export const chatAction=ChatSlice.actions

export default ChatSlice.reducer