import { Button, Container,Form } from "react-bootstrap"



const ChatHome=()=>{

    return(
        <Container>
             <h2>Chat App</h2>
             

         <div>
              <Form>
                 <Form.Group>
                     <Form.Control type="text" name="chat" />
                 </Form.Group>
                 <Button>Send</Button>
              </Form>
            </div> 
             
        </Container>
    )
}

export default ChatHome