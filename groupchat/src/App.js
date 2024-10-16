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

  const {data,error,loading}=useFetch('http://localhost:4000/groupchat/allchats')
  console.log(data)
  const dispatch=useDispatch()
  useEffect(()=>{
      
       dispatch(authAction.signIn({email:localStorage.getItem('email'),token:localStorage.getItem('token')}))
       
  },[])

  

  const isLogin=useSelector(state=>state.auth.isLogin)
  console.log(isLogin)
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
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
