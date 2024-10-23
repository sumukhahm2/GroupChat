import {useState,useEffect,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { chatAction } from '../store/ChatSlice'

const useFetch=(url,type,props)=>{
    
   const [state,setState]=useState({data:null,error:null,loading:true,status:false})
     const dispatch=useDispatch()
     const islogin=useSelector(state=>state.auth.isLogin)

     console.log(url)
    useEffect(()=>{
         
        async function getDatas(){
            
            const response=await fetch(url,{
              headers:{
                'Authorization':localStorage.getItem('token')
              }
            })
            const fetchedData=await response.json()
            console.log(fetchedData)
          if(fetchedData)
          {
            
            if(type==='ALL_CHATS')
            {
              console.log(fetchedData.id)
              if(fetchedData.id===0 && fetchedData.data)
                  {
                      console.log('data first time')
                      
                      localStorage.setItem('messages',JSON.stringify(fetchedData.data))
                      dispatch(chatAction.addAllMessages(fetchedData.data))
                  }
                  else if(fetchedData.status )
                  {
                      console.log('data from backend')
                    const oldMessages=JSON.parse(localStorage.getItem('messages'))
                    const newMessages=fetchedData.data
                    console.log(oldMessages)
                    console.log(newMessages)
                    const messages=[...oldMessages,...newMessages]
                    console.log(messages)
                    localStorage.setItem('messages',JSON.stringify(messages))
                    dispatch(chatAction.addAllMessages(messages))
                    
                    
                  }
                  else if(!fetchedData.status){
                      console.log('data from localstorage')
                      const messages=JSON.parse(localStorage.getItem('messages'))
                      if(Array.isArray(messages))
                      {
                        const data=messages.filter(msg=>msg.groupchat.id===props.groupDetails.id)
                      console.log(data)
                      dispatch(chatAction.addAllMessages(data))
                      }
                      else 
                      dispatch(chatAction.addAllMessages([]))
                      
                  }
                    
            }
            if(type==='All_Groups')
            {
              console.log(fetchedData)
              dispatch(chatAction.addAllGroups(fetchedData.data))
            }
            if(type==='INVITES')
              {
                console.log('invtes')
                dispatch(chatAction.addAllInvites(fetchedData.data))
              }
              setState({data:fetchedData.data,error:null,loading:false,status:fetchedData.status})
            }
            
           
            

        }
      
          getDatas()
       
    

    //   clearInterval(interval)
        
    },[url,props])
      
   
    return state
    

}

export default useFetch