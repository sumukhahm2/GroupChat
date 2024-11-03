import {createSlice} from '@reduxjs/toolkit'

const defaultValue={
  contacts:[]
}

const ContactSlice=createSlice({
    name:'contact',
    initialState:defaultValue,
    reducers:{
         addContact(state,action)
         {
            state.contacts=state.contacts.concat(action.payload)
            
            console.log(state.contacts)
            
         },
        getContacts(state,action){
            
            state.contacts=[];
            state.contacts=state.contacts.concat(action.payload)
            console.log(state.contacts)
         },
         
    }
})

export const contactAction=ContactSlice.actions

export default ContactSlice.reducer