import logo from './logo.svg';
import './App.css';
import Login from './componenets/Authentication/Login';
import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { authAction } from './store/AuthenticationSlice';
import ChatHome from './componenets/ChatWindow/ChatHome';
import {Routes,Route} from 'react-router-dom'
import { chatAction } from './store/ChatSlice';
import useFetch from './CustomHooks/useFetch';

function App() {
  const isLogin=useSelector(state=>state.auth.isLogin)

  const dispatch=useDispatch()

  useEffect(()=>{
      
    dispatch(authAction.keepLogin({email:localStorage.getItem('email'),token:localStorage.getItem('token')}))
    
},[])


 
  console.log(isLogin)
  return (
    <div className="App">
      <main className='main'>
        <Routes>
         <Route path='/' element={<Login/>}/>
       {isLogin && <Route path='/home' element={<ChatHome/>}/>}
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
