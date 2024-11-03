
import useFetch from "../../CustomHooks/useFetch"
import { useSelector } from "react-redux"
import SideBar from "../ChatWindow/sideBar"
import { Col,Row,Form,Button} from "react-bootstrap"
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import CustomDropDown from "../ChatWindow/CustomDropDown";
import { FaArrowCircleRight } from "react-icons/fa";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './contacts.css'
import AddGroupForm from "../NvBar/AddGroupForm";
import InviteGroup from "../NvBar/InviteGroup";


const Contacts=(props)=>{
    let contacts
    console.log(props)
    contacts=useSelector(state=>state.contact.contacts)
   const [form,setForm]=useState(false)
     const navigate=useNavigate()
  console.log(contacts)
    useFetch('http://localhost:4000/groupchat/getcontacts','GET-CONTACTS')
    const items=['message','Send Invite','Add to Group']

    const selectedItem=async(item)=>{
        if(item.item==='Add to Group')
        {  
            console.log(item)
            
            const memberData={
                phone:item.contact,
                groupId:props.groupId
            }
           const response=await fetch('http://localhost:4000/groupchat/addmember',
            {
                method:'POST',
                body:JSON.stringify(memberData),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data=await response.json()
            if(data.error)
                alert(data.error)
        }
    }
    let contactsData=[]
      const changedValue=(e)=>{
       
      if(e.target.checked)
      {
        const index=contactsData.findIndex(item=>item===e.target.value)
        if(index===-1)
         contactsData.push(e.target.value)
      }
      else if(!e.target.checked && contactsData.length>0)
      {
        contactsData=contactsData.filter(item=>item!==e.target.value)
      }
      console.log(contactsData.length)
      }

      const handleCreateGroup=()=>{
        if(contactsData.length>0)
            navigate('/creategroup',{state:contactsData}) 
        else
        alert('Select Atleast One Member')
      }

      if(contacts.length===0)
        return <h1>No Contacts Found</h1>
      

    return(
        
       <div className={props.type==='invite-group'?"bg-white  shadow-sm p-2 z-2 w-75 ":"bg-white m-3 shadow-sm p-2  "}>
            <Col>
           
             <h1 className="text-secondary ">Contacts List</h1>
             
            {(props.type==='invite-group'?props.filter:contacts).map(item=>
                <Row className={props.type==='invite-group'?'mb-2 border border-ridge  shadow-sm  mx-3 text-center  rounded':"mb-2 border border-ridge shadow-sm w-75 mx-3  text-center rounded "} >
                    <Col className={props.type==='invite-group'?"col-7":"col-9"} >
                   <p className="fs-4 text-success"><MdDriveFileRenameOutline/>  {item.username}</p>
                   <p className="fs-5"> <FaPhoneAlt/>    {item.phone}</p>
                   </Col>
                   <Col>
                   <CustomDropDown items={item.isMember?items:items.filter(item=>item!=='Add to Group')} contact={item.phone} selectedItem={selectedItem} name="vertical-dot"/>
                   </Col>
                   {!item.isMember && <div className="text-danger">Not A GroupChat Member</div>}
                  { !item.isMember && <Col></Col>}
                  {props.filter && item.isMember && <Col className="text-end">
                
                     <Form className="fs-3">
                     <Form.Check >
                      <Form.Check.Input  isValid onChange={changedValue} value={item.phone}/>
                      </Form.Check>
                     </Form>
                   </Col>}
                </Row>
                
            )}
            
            </Col>
            {props.filter && props.groupId===null && <Col className='text-end'>
            <FaArrowCircleRight className="fs-1 " style={{color:'green',cursor:'pointer'}} onClick={handleCreateGroup}/>
            </Col>}
            {props.filter && props.groupId!==null && <Col className='text-end'>
            <Button className="bg-success" tyle={{cursor:'pointer'}}>+</Button>
            </Col>}
        </div>
       
       
    )
}


export default Contacts