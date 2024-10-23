
import {useState,useRef} from 'react'
import { useDispatch,useSelector } from "react-redux"
import {Form,Button} from 'react-bootstrap'
import { chatAction } from '../../store/ChatSlice'
import useFetch from "../../CustomHooks/useFetch"

const ChatSpace=(props)=>{

    const chatRef=useRef()
    const phoneRef=useRef()
    const [error,setError]=useState(null)
    const [inviteForm,setInviteForm]=useState(false)
    const dispatch=useDispatch()

    let id=0;
      
    const msgData=JSON.parse(localStorage.getItem('messages'))
    console.log(Array.isArray(msgData))

    if(Array.isArray(msgData))
    {
     const msgLength=msgData.length
    
    id=msgData[msgLength-1].id
    console.log(id)
 }
    
     
 
 const {data,errors,loading,status}=useFetch(`http://localhost:4000/groupchat/allchats?lastmessageid=${id}&groupchatid=${props.groupDetails.id}`,'ALL_CHATS',props)

    const messages=useSelector(state=>state.chat.messages)
    console.log(messages)
    //const [error,setError]=useState(null)
   

    const handleSendMessage=async(e)=>{
        e.preventDefault()
        console.log(props)
        const chatData={
         message:chatRef.current.value,
         token:localStorage.getItem('token'),
         groupId:props.groupDetails.id,
         groupname:props.groupDetails.groupname
        }
        try{
             const response=await fetch('http://localhost:4000/groupchat/send',{
                 method:'POST',
                 body:JSON.stringify(chatData),
                 headers:{
                     'Content-Type':'application/json',
                     'Authorization':localStorage.getItem('token')
                 }
             })
 
             const data=await response.json()
             console.log(data)
             if(data && data.error)
                 throw new Error(data.error)
             if(data)
             {
               dispatch(chatAction.addMessages({messages:data.message}))
             }
             
        }
        catch(error){
            setError(error.message)
        }
        
     }

    const handleInviteLink=async(event)=>{
      event.preventDefault()
      const inviteData={
        phone:phoneRef.current.value
      }
      try{
         const response=await fetch(`http://localhost:4000/groupchat/invite/${props.groupDetails.id}`,
            {
                method:'POST',
                body:JSON.stringify(inviteData),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':localStorage.getItem('token')
                }
            }
         )

         const data=await response.json()
         console.log(data)
         if(data && data.status)
         {
           
         }
      } 
      catch(error)
      {
        console.log(error)
      }

    }

    return(
        <div>
             <h2>Chat App</h2>
             {error && <p>{error}</p>}
            <div className="chatspace">
                {messages && messages.map(msg=>
                <div className='fw-bolder border rounded mb-2 w-25 mw-100 ' style={{background:'#98FB98'}}>
                  <h6 style={{color:'#FF1493'}}>{msg.sendername}</h6>
                   <h6 >{msg.message}</h6>
                   </div>
                )}
                
           </div> 
           <div >
             <div className='invite-button'>
                {!inviteForm && <Button className='btn-secondary' onClick={()=>setInviteForm(true)}>Invite Using Link</Button>}
                {inviteForm && <Form  onSubmit={handleInviteLink}>
                    <Form.Group>
                        <Form.Label>Enter Mobile Number</Form.Label>
                        <Form.Control type='number' ref={phoneRef}/>
                    </Form.Group>
                    <Button className='btn-warning' type='submit'>Send Invite Link</Button>
                </Form>}
             </div>
              <Form className="d-flex flex-row " onSubmit={handleSendMessage}>
                     <Form.Control type="text" name="chat" ref={chatRef} />
                 <Button className="mx-2" type="submit" >Send</Button>
              </Form>
            </div>
        </div>
    )
}

export default ChatSpace