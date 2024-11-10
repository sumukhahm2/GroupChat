import useFetch from "../../CustomHooks/useFetch"
import { useSelector,useDispatch } from "react-redux"
import SideBar from "./sideBar"
import './GroupDetails.css'
import { Button, Col, Row,Dropdown } from "react-bootstrap"
import { useParams } from "react-router-dom"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import { BsThreeDotsVertical } from "react-icons/bs";
import { chatAction } from "../../store/ChatSlice"

const GroupDetails=()=>{

    const params=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()

      //useFetch(`http://localhost:4000/groupchat/groupdetails?groupid=${params.groupid}`,'GROUP-DETAILS')
    const groupDetails=useSelector(state=>state.chat.groupdetails)
    console.log(groupDetails)
     let currentUser=[]
     if(groupDetails.length>0)
     currentUser=groupDetails.filter(user=>
        user.name.phone===localStorage.getItem('phone'))
 
  console.log(currentUser)

    const changeAuthority=async(datas)=>{
        const updatingData={
            groupid:params.groupid,
            authid:datas.id,
            isAdmin:datas.isAdmin
        }
        const response=await fetch(`http://localhost:4000/groupchat/updateauthority`,
            {
                method:'POST',
                body:JSON.stringify(updatingData),
                headers:{
                    'Content-Type':'application/json'
                }
            }

        )
        const data=await response.json()
        if(data)
        {
            dispatch(chatAction.updateGroupDetails({id:datas.id,type:'update-admin'}))
        }
        console.log(data)
    }

    const exitGroup=async(groupid,authId)=>{
      console.log(authId)
      const exitData={
        groupId:groupid,
        authId:authId
      }
      let response
      if(authId===currentUser[0].authId)
      {
       response=await fetch('http://localhost:4000/groupchat/exitgroup',{
        method:'POST',
        body:JSON.stringify(exitData),
        headers:{
            'Content-Type':'application/json',
            'Authorization':localStorage.getItem('token')
        }
      })
    }
    else{
        response=await fetch('http://localhost:4000/groupchat/exitgroup',{
            method:'POST',
            body:JSON.stringify(exitData),
            headers:{
                'Content-Type':'application/json',
                
            }
          })
    }
      const data=await response.json()
      console.log(data.message)
      if(data.message)
      {
        dispatch(chatAction.updateGroupDetails({id:authId,type:'update-member'}))
      }
      
    
    }

   
    
    return(
        <SideBar>
        <Col className="group-details">
           <h3 >Participants</h3>
            <ul className=" justify-content-center">
                {groupDetails.map(name=>
                    <>
                     {name.isMember && <li className="d-flex justify-content-center">
                          
                            <Col className="col-4">
                            <h5 className="my-2">{name.name.username}</h5>
                            </Col>
                            <Col>
                            <h6 className={name.isAdmin?"mx-2 text-success my-2 border border-ridge rounded border-success px-1 w-50 h-50 fs-smaller":''}>{name.isAdmin?'Group Admin':' '}</h6>
                            </Col>
                            <Col>
                           {name.name.phone!==localStorage.getItem('phone')  && currentUser[0].isMember &&<Dropdown>
                                        <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                                            <BsThreeDotsVertical/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {currentUser[0].isAdmin && !name.isAdmin && <Dropdown.Item onClick={changeAuthority.bind(null,{id:name.authId,isAdmin:name.isAdmin})}>Make Group Admin</Dropdown.Item>}
                                            <Dropdown.Item >Message </Dropdown.Item>
                                            {currentUser[0].isAdmin && <Dropdown.Item onClick={()=>exitGroup(params.groupid,name.authId)}>Remove From Group</Dropdown.Item>}
                                            <Dropdown.Item >Add to Contacts</Dropdown.Item>
                                            {currentUser[0].isAdmin && name.isAdmin && <Dropdown.Item onClick={changeAuthority.bind(null,{id:name.authId,isAdmin:name.isAdmin})}>Dismiss as Group Admin</Dropdown.Item>}
                                        </Dropdown.Menu>
                            </Dropdown>}
                            

                            </Col>
                    
                         </li>}
                         </>
                )}
            </ul>
            <Row className="d-flex align-items-center justify-content-center">
           {currentUser.length>0 && currentUser[0].isMember && <Button className="btn-danger w-75" onClick={()=>exitGroup(params.groupid,currentUser[0].authId)}>Exit Group</Button>}
           {currentUser.length>0 && !currentUser[0].isMember &&<h5 className="text-danger bg-warning w-75 text-center">You Are No Longer The Member Of This Group</h5>}
            </Row>
           
        </Col>
        </SideBar>
    )
}

export default GroupDetails