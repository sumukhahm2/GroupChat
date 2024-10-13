import {Button,Form} from 'react-bootstrap'


const Login=()=>{

    return(
        <div>
    <Form className='text-center'>
        <Form.Text className='fs-2 text-warning'>Register Here</Form.Text>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"   />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password"  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Phone Number"  />
      </Form.Group>
      <Button variant="warning" type="submit" className='text-dark '>
        SignUp
      </Button>
    </Form>

        </div>
    )
}

export default Login