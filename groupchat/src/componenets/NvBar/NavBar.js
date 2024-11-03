import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBar.css'
import { IoLogoWechat } from "react-icons/io5";
import {useState,useRef} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { chatAction } from '../../store/ChatSlice'
import useFetch from '../../CustomHooks/useFetch'
import { authAction } from '../../store/AuthenticationSlice'
import { useNavigate } from 'react-router-dom'
import AddGroupForm from './AddGroupForm';
import InviteGroup from './InviteGroup';
import ContactForm from '../ChatWindow/ContactForm';
import useCheckMobileScreen from '../ChatWindow/useCheckMobileScreen';


function NavBar() {
    useFetch('http://localhost:4000/groupchat/invites','INVITES')
    const isMobile=useCheckMobileScreen()

    const [showForm,setForm]=useState(false)
    const [showContactForm,setContactForm]=useState(false)
    const [inviteData,setInviteData]=useState([])
    const [isInvite,setInvite]=useState(false)
     const groupNameRef=useRef()
      const dispatch=useDispatch()
      const invites=useSelector(state=>state.chat.invites)
      const isLogin=useSelector(state=>state.auth.isLogin)
      const navigate=useNavigate()

  console.log(invites)
    
    const handleInvites=()=>{
      setInvite(true)
       setInviteData(invites)
    }
    
   
    const logoutHandler=()=>{
        alert('Are You Sure ? Want to Logout!')
       dispatch(authAction.logout())
       navigate('/')
    }

   
    console.log(inviteData)
  return (
    <>
    <Navbar expand={isMobile?"sm":"lg"} className=" navbar " bg='success'>
      <Container>
        <Navbar.Brand href="#home" className='text-white'><IoLogoWechat className='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!isLogin && <h1 className='mx-5'>Welcome To GroupChat App</h1>}
          {isLogin && <Nav className="me-auto">
            <Nav.Link href="/home" className='text-white'>Chats</Nav.Link>
            <Nav.Link href="/contacts" className='text-white'>Contacts</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className=''>
              <NavDropdown.Item className='text-dark' href='/search'>Create Group</NavDropdown.Item>
              <NavDropdown.Item className='text-dark' href='/contactform'>
              New Contact
              </NavDropdown.Item>
              <NavDropdown.Item  className='text-dark' onClick={handleInvites}>Invites</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  className='text-dark' onClick={logoutHandler}>
              Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showForm && <AddGroupForm setForm={setForm}/>}
    {isInvite && <InviteGroup/>}
    {showContactForm && <ContactForm/>}
    </>
  );
}

export default NavBar;