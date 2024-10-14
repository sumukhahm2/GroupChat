import { Button, Container,Form } from "react-bootstrap"
import './ChatHome.css'
import {useRef, useState} from 'react'


const ChatHome=()=>{

    const chatRef=useRef()
    const [error,setError]=useState(null)

    const handleSendMessage=async(e)=>{
       e.preventDefault()
       console.log(chatRef.current.value)
       const chatData={
        message:chatRef.current.value,
        token:localStorage.getItem('token')
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
       }
       catch(error){
           setError(error)
       }
       
    }

    return(
        <Container className="text-center">
             <h2>Chat App</h2>
            <div className="chatspace">
                <h6>You Joined</h6>
           </div> 

         <div >
              <Form className="d-flex flex-row " onSubmit={handleSendMessage}>
                     <Form.Control type="text" name="chat" ref={chatRef} />
                 <Button className="mx-2" type="submit" >Send</Button>
              </Form>
            </div> 
             
        </Container>
    )
}

export default ChatHome