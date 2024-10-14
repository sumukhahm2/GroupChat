import {Button,Form} from 'react-bootstrap'
import {useState,useRef} from 'react'

const Login=()=>{

  const nameRef=useRef()
  const emailRef=useRef()
  const passwordRef=useRef()
  const confirmPasswordref=useRef()
  const phoneRef=useRef()

  const [error,setError]=useState(null)
  const [message,setMessage]=useState(null)


  const handleSignupForm=async(event)=>{
      event.preventDefault()
     
      try{

        const signUpData={
          name:nameRef.current.value,
          email:emailRef.current.value,
          password:passwordRef.current.value,
          phone:phoneRef.current.value
        }
        const response=await fetch('http://localhost:4000/groupchat/signup',
          {
            method:'POST',
            body:JSON.stringify(signUpData),
            headers:{
              'Content-Type':'application/json'
            }
          }
        )
         const data=await response.json()

         if(data && data.error)
         {
          throw new Error(data.error)
         }
         else if(data && data.message)
            setMessage(data.message)
          else 
            throw new Error('Something Went Wrong')
        
      }
      catch(error){
        setError(error.message)
      }
      setTimeout(()=>{
        setError(null)
      },5000)

  }

 

    return(
        <div>
    <Form className='text-center' onSubmit={handleSignupForm}>
        
        <Form.Text className='fs-2 text-warning'>Register Here</Form.Text>
        <h5 className={message?'text-success':'text-danger'}>{message?message:error}</h5>
        <Form.Group className="mb-3 " >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name"  ref={nameRef} required/>
      </Form.Group>
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
      <Form.Group className="mb-3" >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordref} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Phone Number" ref={phoneRef} required/>
      </Form.Group>
      <Button variant="warning" type="submit" className='text-dark ' >
        SignUp
      </Button>
    </Form>

        </div>
    )
}

export default Login