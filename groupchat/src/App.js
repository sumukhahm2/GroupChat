import logo from './logo.svg';
import './App.css';
import Login from './componenets/Authentication/Login';
import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { authAction } from './store/AuthenticationSlice';
import ChatHome from './componenets/ChatWindow/ChatHome';
import {Routes,Route} from 'react-router-dom'
import ChatSpace from './componenets/ChatWindow/ChatSpace';
import SideBar from './componenets/ChatWindow/sideBar';
import { chatAction } from './store/ChatSlice';
import useFetch from './CustomHooks/useFetch';
import GroupDetails from './componenets/ChatWindow/GroupDetails';
import Contacts from './componenets/Contacts/contacts';
import NavBar from './componenets/NvBar/NavBar';
import ContactForm from './componenets/ChatWindow/ContactForm';
import AddGroupForm from './componenets/NvBar/AddGroupForm';
import SearchContact from './componenets/ChatWindow/SearchContact';

function App() {
  const isLogin=useSelector(state=>state.auth.isLogin)

  const dispatch=useDispatch()

  useEffect(()=>{
     if(localStorage.getItem('email')!==null && localStorage.getItem('token')!==null)
    dispatch(authAction.keepLogin({email:localStorage.getItem('email'),token:localStorage.getItem('token')}))
    
},[])   


 
  console.log(isLogin)
  return (
    <div className="App">
      <header>
         <NavBar/>
      </header>
      <main className='main'>
        <Routes>
        { !isLogin && <Route path='/' element={<Login/>}/>}
        { isLogin && <Route path='/' element={<ChatHome/>}/>}
       {isLogin && <Route path='/home' element={<ChatHome/>}/>}
       {isLogin && <Route path='/home/:groupname' element={<ChatSpace/>}/>}
       {isLogin && <Route path='/contactform' element={<ContactForm/>}/>}
       {isLogin && <Route path='/creategroup' element={<AddGroupForm/>}/>}
       {isLogin && <Route path='/search' element={<SideBar><SearchContact/></SideBar>}/>}
             {isLogin && <Route path='/home/groupdetails/:groupid' element={<GroupDetails/>}/>}
             {isLogin && <Route path='/contacts' element={<Contacts/>}/>}
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
