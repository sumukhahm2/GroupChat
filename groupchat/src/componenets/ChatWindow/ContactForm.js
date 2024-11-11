import { Button, Form } from "react-bootstrap"
import {useRef,useState} from 'react'
import SideBar from "./sideBar"



const ContactForm=()=>{

    const nameRef=useRef()
    const phoneRef=useRef()
    const [message,setMessage]=useState(null)
    const handleAddContact=async(e)=>{
      e.preventDefault()

      const contactData={
        name:nameRef.current.value,
        phone:phoneRef.current.value
      }
       try{
           const response=await  fetch('http://51.20.129.197:3000/groupchat/addcontact',{
            method:'POST',
            body:JSON.stringify(contactData),
            headers:{
                'Authorization':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
           })

           const data=await response.json()
           console.log(data)
           if(data && data.message)
           {
             setMessage(data.message)
           }
       }
       catch(error){
        console.log(error)
       }

    }
    return(
        <SideBar>
        <div className="">
            <h1>Add Contact</h1>
            <Form onSubmit={handleAddContact}>
                {message && <p>{message}</p>}
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" ref={phoneRef}/>
                </Form.Group>
                <Button type="submit">Add Contact</Button>
            </Form>
        </div>
        </SideBar>
    )
}

export default ContactForm