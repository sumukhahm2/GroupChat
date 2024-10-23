import { Button, Col, Container,Form, Row } from "react-bootstrap"
import './ChatHome.css'
import {useRef, useState} from 'react'
import { useDispatch,useSelector } from "react-redux"
import { chatAction } from "../../store/ChatSlice"
import SideBar from "./sideBar"
import DropDownMenu from "./DropDownMenu"
import ChatSpace from "./ChatSpace"
const ChatHome=()=>{

    
      const [groupDetails,setGroupDetails]=useState(null)
     
    const handleChangeGroup=(groupData)=>{
       setGroupDetails(groupData)
    }


    return(
        <Container className="groupchat">
            <Row>
             <Col className="col-2">
              <SideBar changeGroup={handleChangeGroup}/>
            </Col>
             <Col>
            <DropDownMenu/>
           { groupDetails && <ChatSpace groupDetails={groupDetails}/>}
              </Col>  
            </Row>
           
        </Container>
    )
}

export default ChatHome