import { Button, Col, Container,Form, Row } from "react-bootstrap"
import './ChatHome.css'
import {useRef, useState} from 'react'
import { useDispatch,useSelector } from "react-redux"
import { chatAction } from "../../store/ChatSlice"
import SideBar from "./sideBar"
import DropDownMenu from "./DropDownMenu"
import ChatSpace from "./ChatSpace"
import { Link } from "react-router-dom"
import useCheckMobileScreen from "./useCheckMobileScreen"

const ChatHome=()=>{

    const isMobile=useCheckMobileScreen()
 
    return(
      <>
      <SideBar isMobile={isMobile} isHide={false}/>
      </>
        
            // <SideBar>
            //   <Col className="home-col col-one "><DropDownMenu/></Col>
            //   <Col  className="home-col col-4 shadow-lg"><Link to='/home' className="text-decoration-none text-dark">Chats</Link></Col>
            //   <Col  className="home-col col-4 shadow-lg"><Link to='/contacts' className="text-decoration-none text-dark">Contacts</Link></Col>
            // </SideBar>
           
        
    )
}

export default ChatHome