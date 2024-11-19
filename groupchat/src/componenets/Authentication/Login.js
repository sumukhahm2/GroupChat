import {Button,Form} from 'react-bootstrap'
import {useState,useRef} from 'react'
import { useDispatch } from 'react-redux'
import { authAction } from '../../store/AuthenticationSlice'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login=()=>{

  const nameRef=useRef()
  const emailRef=useRef()
  const passwordRef=useRef()
  const confirmPasswordref=useRef()
  const phoneRef=useRef()

  const dispatch=useDispatch()

  const navigate=useNavigate()

  const [error,setError]=useState(null)
  const [message,setMessage]=useState(null)
 const [isSignUp,setState]=useState(true)

 const handleSubmitForm = async (event) => {
  event.preventDefault();

  try {
    let response;

    // Gather data based on the form type (sign up or sign in)
    const formData = isSignUp
      ? {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          phone: phoneRef.current.value,
        }
      : {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };

    // Basic validation (e.g., email and password are required)
    if (!formData.email || !formData.password) {
      throw new Error("Email and password are required");
    }
    if (isSignUp && (!formData.name || !formData.phone)) {
      throw new Error("Name and phone are required for registration");
    }

    // API call
    response = await fetch(
      `http://localhost:4000/groupchat/${isSignUp ? 'signup' : 'signin'}`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Check HTTP response status
    if (!response.ok) {
      throw new Error(`Error: User ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.message) {
      if (isSignUp) {
        setMessage(data.message );
      } else {
        alert(data.message);
        dispatch(authAction.signIn({
          email: data.email,
          token: data.token,
          phone: data.phone,
        }));
        navigate('/home');
      }
    } else {
      throw new Error("Something went wrong. Please try again.");
    }

  } catch (error) {
    setError(error.message);
  } finally {
    // setTimeout(() => {
    //   setError(null);
    //   setMessage(null);
    // }, 5000);
  }
};

 

    return(
        <div className='login-form'>
    <Form className='text-center' onSubmit={handleSubmitForm}>
        
        <Form.Text className='fs-2 text-warning'>{isSignUp?'Register Here':'Login Here'}</Form.Text>
        <h5 className={message?'text-success':'text-danger'}>{message?message:error}</h5>
        {isSignUp && <Form.Group className="mb-3 " >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name"  ref={nameRef} required/>
      </Form.Group>}
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  ref={emailRef} required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  ref={passwordRef} required/>
      </Form.Group>
      {isSignUp && <Form.Group className="mb-3" >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordref} required/>
      </Form.Group>}
      {isSignUp && <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Phone Number" ref={phoneRef} required/>
      </Form.Group>}
      <Button variant="warning" type="submit" className='text-dark ' >
        {isSignUp?'SignUp':'Login'}
      </Button>

      <button className='m-2 pe-auto  border-0 bg-transparent text-info' onClick={()=>{ setState((prev)=>!prev) }}>{isSignUp?"Already Have An Account?":"Don't Have An Account?"}</button>
    </Form>

        </div>
    )
}

export default Login