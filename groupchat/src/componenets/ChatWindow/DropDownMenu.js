

import {useState,useRef} from 'react'
import {Button, Dropdown, Form} from 'react-bootstrap'
import './ChatHome.css'
import { useDispatch,useSelector } from 'react-redux'
import { chatAction } from '../../store/ChatSlice'
import useFetch from '../../CustomHooks/useFetch'

const DropDownMenu=()=>{

 useFetch('http://localhost:4000/groupchat/getgroups','All_Groups')
  useFetch('http://localhost:4000/groupchat/invites','INVITES')

    const [showForm,setForm]=useState(false)
    const [inviteData,setInviteData]=useState([])
    const [isInvite,setInvite]=useState(false)
     const groupNameRef=useRef()
      const dispatch=useDispatch()
      const invites=useSelector(state=>state.chat.invites)

  console.log(invites)
    const handleCreateGroup=async(e)=>{
        e.preventDefault()
         const groupData={
          groupName:groupNameRef.current.value
         }
        try{
          const response=await fetch('http://localhost:4000/groupchat/creategroup',{
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
             dispatch(chatAction.addGroup({...groupData,id:data.groupId}))
        }
        catch(error)
        {

        }
       
    }

    const handleInvites=()=>{
      setInvite(true)
       setInviteData(invites)
    }
    
    const handleJoinGroup=async(data)=>{
        const response=await fetch(data.inviteurl,{
          method:'GET',
          headers:{
            'Authorization':localStorage.getItem('token')
          }
        })

        const resData=await response.json()
        console.log(resData)
    }

    console.log(inviteData)
    return(
        <div>
            {showForm && <div className='border border-dark position-absolute top-50 end-50'><Form onSubmit={handleCreateGroup} className='p-2'>
                <Form.Group>
                    <Form.Label>Enter Group Name</Form.Label>
                    <Form.Control type='text' ref={groupNameRef}/>
                    <Button type='submit'>Submit</Button>
                </Form.Group>
            </Form></div>}
        <div className="dropdown">
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>setForm(true)}>Create Group</Dropdown.Item>
        <Dropdown.Item onClick={handleInvites}>Invites <span className='invite-count'>{invites.length>0?invites.length:0}</span></Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
     {isInvite && <div className='invites'>
        <h3 className='bg-warning border rounded text-light'>Invited Links</h3>
        <ul>
        {inviteData.length>0?inviteData.map(data=>
          <li className='invite-lists'>
              <p className='bg-secondary border rounded text-light'>{data.invitephone}</p>
              <p className='bg-success border rounded text-light'>Invited By:- {data.inviteuser}</p>
              <p className='bg-light border rounded text-light'>link :- <button className='btn-link border-0 bg-transparent text-primary ' onClick={handleJoinGroup.bind(null,data)}>{data.inviteurl}</button></p>
            </li>
        ):<p>No Invites</p>}
        </ul>
    </div>}
    </div>
    )
}

export default DropDownMenu