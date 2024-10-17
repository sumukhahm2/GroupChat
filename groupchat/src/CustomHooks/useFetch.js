import {useState,useEffect,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { chatAction } from '../store/ChatSlice'

const useFetch=(url,id)=>{
    
   // const [state,setState]=useState({dta:null,error:null,loading:true})
     const dispatch=useDispatch()
     //const messages=useSelector(state=>state.chat.messages)
    useEffect(()=>{
         
        async function getDatas(){
          
            const response=await fetch(url)
            const data=await response.json()
            console.log(data)
            if(id===0 && data)
            {
                console.log('data first time')
                 localStorage.setItem('messages',JSON.stringify(data.messages))
                 dispatch(chatAction.addAllMessages(data.messages))
            }
            else if(data && data.status)
            {
                console.log('data from backend')
               const oldMessages=JSON.parse(localStorage.getItem('messages'))
               const newMessages=data.messages
               console.log(oldMessages)
               console.log(newMessages)
               const messages=[...oldMessages,...newMessages]
               console.log(messages)
               localStorage.setItem('messages',JSON.stringify(messages))
               dispatch(chatAction.addAllMessages(messages))
               clearInterval(interval)
               
            }
            else{
                console.log('data from localstorage')
                const messages=JSON.parse(localStorage.getItem('messages'))
                dispatch(chatAction.addAllMessages(messages))
            }
               
            

        }
        
       const interval=setInterval(async()=>{
          await getDatas()
       },1000)

    //   clearInterval(interval)
        
    },[url])
      
   
    

}

export default useFetch