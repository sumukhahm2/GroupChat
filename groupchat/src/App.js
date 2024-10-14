import logo from './logo.svg';
import './App.css';
import Login from './componenets/Authentication/Login';
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { authAction } from './store/AuthenticationSlice';

function App() {

  const dispatch=useDispatch()
  useEffect(()=>{
       dispatch(authAction.signIn({email:localStorage.getItem('email'),token:localStorage.getItem('token')}))
  },[])

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <main className='main'>
        <Login/>
      </main>
    </div>
  );
}

export default App;
