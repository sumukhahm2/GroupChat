import {useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { chatAction } from '../store/ChatSlice'

const useFetch=(url)=>{
    
    const [state,setState]=useState({data:null,error:null,loading:true})
     const dispatch=useDispatch()
    useEffect(()=>{
               console.log('hi')
              
                const interval=setInterval(async()=>{
                    try{
                        console.log(url)
                        setState((state)=>({data:state.data,error:null,loading:true}))
                      const response=await fetch(url,
                        {
                          method:'GET',
                          headers:{
                            'Content-Type':'application/json',
                          }
                        }
                       
                      )
                      const data=await response.json()
                      console.log(data)
                      if(data)
                        // setState(({data:data.messages,error:null,loading:false}))
                      dispatch(chatAction.addAllMessages(data.messages))
                      else
                       throw new Error("Unable to Fetch Messages")
                    }
                    catch(error){
                      console.log(error.message)
                    }
               },5000)

         return ()=>clearInterval(interval)

               

    },[url])
    
    return state
    

}

export default useFetch