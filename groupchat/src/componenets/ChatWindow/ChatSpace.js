
import {useState,useRef, useEffect} from 'react'
import { useDispatch,useSelector } from "react-redux"
import {Form,Button,Row,Col} from 'react-bootstrap'
import { chatAction } from '../../store/ChatSlice'
import useFetch from "../../CustomHooks/useFetch"
import { Link, useParams,useSearchParams,useNavigate} from 'react-router-dom'
import SideBar from './sideBar'
import useCheckMobileScreen from './useCheckMobileScreen'
import socket from '../../Socket/Socket'
import { MdAttachFile } from "react-icons/md";
import Message from './Message'
import { useMemo } from 'react';

const ChatSpace=()=>{
  const [searchParams]=useSearchParams()
  const groupId = useMemo(() => searchParams.get('id'), [searchParams]);
  const phoneNumber=useMemo(() =>localStorage.getItem('phone'),[searchParams]);

  let id=0;
      
  const msgData=JSON.parse(localStorage.getItem('messages'))
 

  if(Array.isArray(msgData))
  {
   const msgLength=msgData.length
  
  id=msgData[msgLength-1].id
  console.log(id)
}
  useFetch(`http://localhost:4000/groupchat/allchats?lastmessageid=${id}&groupchatid=${groupId}`,'ALL_CHATS',groupId)
  useFetch(`http://localhost:4000/groupchat/groupdetails?groupid=${groupId}`,'GROUP-DETAILS')
    const chatRef=useRef()
    const phoneRef=useRef()
    const [error,setError]=useState(null)
    const [inviteForm,setInviteForm]=useState(false)
    const [file,setFile]=useState(null)
    
    const dispatch=useDispatch()
    const param=useParams()
    const navigate=useNavigate()
    
   
    const joinedMembers=useSelector(state=>state.chat.members)
    console.log(joinedMembers)
   
    const messages=useSelector(state=>state.chat.messages)
    const groupDetails=useSelector(state=>state.chat.groupdetails)
   
    let currentUser=[]
    let datas=[]
     if(groupDetails.length>0)
     currentUser=groupDetails.filter(user=>
        user.name.phone===localStorage.getItem('phone'))

     

    const socketJoinData={
      groupId:groupId,
      phoneNumber:[phoneNumber],
      
    }
    
 let socketMessages=[]
 useEffect(() => {
  if(groupId)
  {
    socket.emit('join-chat', socketJoinData);
    console.log('joining '+groupId)
  }
 
  

     socket.on('receive-message', (incomingMessage) => {
    console.log(incomingMessage)
    if(currentUser.length>0 && currentUser[0].isMember)
    dispatch(chatAction.addMessages(incomingMessage.message));
    });
  


  socket.on('members', (incomingMessage) => {
    console.log(incomingMessage)
    diapatch(chatAction.joinMembers(incomingMessage))
  });
  
  
  // Cleanup listener on component unmount
 return () => {
       socket.emit('leave', {groupId:groupId,phoneNumber:localStorage.getItem('phone')});
      console.log('leaving group id '+groupId)
      socket.off('receive-message'); 
      socket.off('members');
     
      
    };
  }, [groupId]);
 
  
 
 
 const isMobile=useCheckMobileScreen()
  console.log(isMobile)
   
    console.log(groupDetails)
    
        console.log(currentUser)
    //const [error,setError]=useState(null)
   
   
    const handleSendMessage=async(e)=>{
        e.preventDefault()
       
        const chatData={
         message:chatRef.current.value,
         token:localStorage.getItem('token'),
         groupId:groupId,
         groupname:param.groupname
        }
        console.log(chatData)
        try{
             const response=await fetch('http://localhost:4000/groupchat/send',{
                 method:'POST',
                 body:JSON.stringify(chatData),
                 headers:{
                     'Content-Type':'application/json',
                     'Authorization':localStorage.getItem('token')
                 }
             })
 
             const data=await response.json()
             console.log(data.message)
             if(data && data.error)
                 throw new Error(data.error)
             if(data)
             {
               dispatch(chatAction.addMessages(data.message))
               const sendMessage={
                groupChatId:groupId,
                message:data.message,
                
               }
               if(socket.connected)
               socket.emit('send-message',sendMessage)
              else  
                console.log('socket not connected')
             }
             
        }
        catch(error){
            setError(error.message)
        }
        
     }

    const addMember=()=>{
      const data={
         id:groupId,
         phone:localStorage.getItem('phone')
      }
      navigate('/search',{state:data})
    }



    const handleInviteLink=async(event)=>{
      event.preventDefault()
      const inviteData={
        phone:phoneRef.current.value,
        groupname:param.groupname
      }
      try{
        console.log(groupId)
         const response=await fetch(`http://localhost:4000/groupchat/invite/${groupId}`,
            {
                method:'POST',
                body:JSON.stringify(inviteData),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':localStorage.getItem('token')
                }
            }
         )

         const data=await response.json()
         console.log(data)
         if(data && data.status)
         {
           alert(<p className='text-success'>Invitation sent Successfully</p>)
         }
      } 
      catch(error)
      {
        console.log(error)
      }

    }

    const handleFileChange = async (e) => {
      console.log(e.target.files)
      const formData = new FormData();
      try {
        const selectedFile = e.target.files;
        console.log(selectedFile)
        if (!selectedFile) {
          console.error("No file selected.");
          return;
        }
    
        // Create a FormData object to handle file upload
        for (let i = 0; i < selectedFile.length; i++) {
         
          formData.append('files', selectedFile[i]);
      }
      
      
        // Send the file to the server
        const response = await fetch(`http://localhost:4000/groupchat/upload?groupid=${groupId}&groupname=${param.groupname}`, {
          method: "POST",
          body: formData,
          headers: {
            // Only include authorization header if needed
            'Authorization': localStorage.getItem("token"),
          },
        });
    
        // Parse the response
        if (!response.ok) {
          throw new Error(`Failed to upload file: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log("File uploaded successfully:", data);
        if(data && data.message)
          {
            dispatch(chatAction.addMessages(data.message))
          }
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    };
    
    const attachFiles=()=>{
       document.getElementById('fileInput').click()
    }

    const verifyCurrentMember=(phone)=>{
      if(currentUser.length>0 && phone===searchParams.get('created'))
        return true
      else
      return false
    }
    //const path=`/home/:${param.groupname}/groupdetails`
    const pth=`/home/groupdetails/${groupId}`
    const groupBtnClass=isMobile?'text-center text-success border border-ridge border-success rounded   w-100':'text-center text-success border border-ridge border-success rounded w-25'
    const isYou=currentUser.length>0 && currentUser[0].name.phone===searchParams.get('created')
    const msgFormClass=isMobile?'d-flex flex-row  w-75 position-fixed':'d-flex flex-row  w-50'
    return(
        <SideBar isMobile={isMobile} isHide={true}>
           {groupId && <Col className="chatspace">
             <Link to={pth} className=''><h2 className='w-100'>{param.groupname}</h2></Link>
             {error && <p>{error}</p>}
            
               <div className='chats'>
                <div className='border border-ridge  my-2 h-50 mx-2 bg-white'>
                  <h4 className='text-center'>{param.groupname}</h4>
                  <h5 className='text-center text-secondary mb-2'>{currentUser.length>0 && verifyCurrentMember(currentUser[0].name.phone)?'You':`${searchParams.get('created')}`} Created The Group</h5>
                  <div className='d-flex justify-content-center align-items-center  mb-2' role='button'>
                  <div className={groupBtnClass} onClick={()=>{navigate(`/home/groupdetails/${groupId}`)}}>Group Details</div>
                  </div>
                 {currentUser.length>0 && currentUser[0].isMember && <div className='d-flex justify-content-center  align-items-center' role='button'>
                  <div className={groupBtnClass} role='button' onClick={addMember}>Add Member</div>
                  </div>}
                </div>
                <div>
        
                {groupDetails.map((data)=><>{currentUser[0].name.phone!==data.name.phone && <p className='text-secondary fw-bolder w-75'>{`${verifyCurrentMember(currentUser[0].name.phone)?'You':searchParams.get('created')} added ${verifyCurrentMember(data.name.phone)?'you':data.name.phone}` }</p>}</>)}
                {messages && messages.map(msg=>

                   <>
                    <Message msg={msg} currentUser={currentUser} isMobile={isMobile}/>
                   </>
                )}
                </div>
                </div>
               
           <div >
           
             <div className='invite-button'>
                {!inviteForm && groupId && currentUser.length>0 && currentUser[0].isMember && <Button className='btn-secondary h-50' onClick={()=>setInviteForm(true)}>Invite Using Link</Button>}
                {inviteForm && <Form  onSubmit={handleInviteLink}>
                    <Form.Group>
                      
                        <Form.Label>Enter Mobile Number</Form.Label>
                        <Form.Control type='number' ref={phoneRef}/>
                    </Form.Group>
                    <Button className='btn-warning' type='submit'>Send Invite Link</Button>
                </Form>}
             </div>
             {currentUser.length>0 && !currentUser[0].isMember && <div className='text-danger bg-warning text-center w-75 fs-5'>You Are No Longer A Member Of This Group</div>}
              {groupId && currentUser.length>0 && currentUser[0].isMember && <Form className={msgFormClass} onSubmit={handleSendMessage} >
                    <Form.Group className='border border-ridge border-black d-flex rounded flex-grow-1 justify-content-end'>
                     <Form.Control type="text" name="chat" ref={chatRef} className='form-control-plaintext'/>
                     <input  type="file" id="fileInput" className='d-none'  onChange={handleFileChange} multiple/>
                     <MdAttachFile className='fs-3 attach' onClick={attachFiles}/>
                     </Form.Group>
                 <Button className="mx-2" type="submit" >Send</Button>
              </Form>}
            </div>
           
            </Col> }
           
        </SideBar>
    )
}

export default ChatSpace