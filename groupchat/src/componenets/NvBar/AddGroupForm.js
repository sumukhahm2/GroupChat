import { Form,Button } from "react-bootstrap"
import {useRef} from 'react'
import { useDispatch } from "react-redux"
import { chatAction } from "../../store/ChatSlice"
import SideBar from "../ChatWindow/sideBar"
import { useLocation } from "react-router-dom"
const AddGroupForm=(prop)=>{
     
    const groupNameRef=useRef()
    const dispatch=useDispatch()
   const location=useLocation()

   console.log(location.state)

   
    const handleCreateGroup=async(e)=>{
        e.preventDefault()
         const groupData={
          groupname:groupNameRef.current.value,
          members:location.state,
          phone:localStorage.getItem('phone')
         }
        try{
          const response=await fetch('http://51.20.129.197:3000/groupchat/creategroup',{
            method:'POST',
            body:JSON.stringify(groupData),
            headers:{
              'Content-Type':'application/json',
              'Authorization':localStorage.getItem('token')
            }
          })

          const data=await response.json()
          console.log(data)
          if(data && data.message)
          {
            alert(`Congradulations ${groupData.groupname} created successfully`)
             dispatch(chatAction.addGroup({...groupData,id:data.groupId}))
             prop.setForm(false)

          }
            
        }
        catch(error)
        {

        }
       
    }


   

    return(
        <SideBar>
        <div className='border border-dark p-2 rounded w-50' style={{background:'#DAF7A6'}}><Form onSubmit={handleCreateGroup} className='p-2'>
        <Form.Group>
            <Form.Text><h2 className="text-success">Create Group</h2></Form.Text>
            
            <Form.Label className="text-success">Enter Group Name</Form.Label>
            <Form.Control type='text' ref={groupNameRef} className="mb-2"/>
            <Button type='submit' variant="success">Create</Button>
        </Form.Group>
    </Form>
    </div>
    </SideBar>
    )
}

export default AddGroupForm