
import {useState,useRef, useEffect} from 'react'
import { useDispatch,useSelector } from "react-redux"
import {Form,Button,Row,Col} from 'react-bootstrap'
import { chatAction } from '../../store/ChatSlice'
import useFetch from "../../CustomHooks/useFetch"
import { Link, useParams,useSearchParams,useNavigate} from 'react-router-dom'
import SideBar from './sideBar'
import useCheckMobileScreen from './useCheckMobileScreen'

const ChatSpace=()=>{

    const chatRef=useRef()
    const phoneRef=useRef()
    const [error,setError]=useState(null)
    const [inviteForm,setInviteForm]=useState(false)
    const [searchParams]=useSearchParams()
    const dispatch=useDispatch()
    const param=useParams()
    const navigate=useNavigate()
    

    
    let id=0;
      console.log(param.groupname)
      console.log(searchParams.get('created'))
    const msgData=JSON.parse(localStorage.getItem('messages'))
    console.log(Array.isArray(msgData))

    if(Array.isArray(msgData))
    {
     const msgLength=msgData.length
    
    id=msgData[msgLength-1].id
    console.log(id)
 }
    
     
 
 useFetch(`http://16.171.19.58:3000/groupchat/allchats?lastmessageid=${id}&groupchatid=${searchParams.get('id')}`,'ALL_CHATS',searchParams.get('id'))
 useFetch(`http://16.171.19.58:3000/groupchat/groupdetails?groupid=${searchParams.get('id')}`,'GROUP-DETAILS')
 const isMobile=useCheckMobileScreen()
  console.log(isMobile)
    const messages=useSelector(state=>state.chat.messages)
    const groupDetails=useSelector(state=>state.chat.groupdetails)
    let currentUser=[]
     if(groupDetails.length>0)
     currentUser=groupDetails.filter(user=>
        user.name.phone===localStorage.getItem('phone'))
    console.log(searchParams.get('created'))
    console.log(messages)
    //const [error,setError]=useState(null)
   
   
    const handleSendMessage=async(e)=>{
        e.preventDefault()
       
        const chatData={
         message:chatRef.current.value,
         token:localStorage.getItem('token'),
         groupId:searchParams.get('id'),
         groupname:param.groupname
        }
        try{
             const response=await fetch('http://16.171.19.58:3000/groupchat/send',{
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
             }
             
        }
        catch(error){
            setError(error.message)
        }
        
     }

    const handleInviteLink=async(event)=>{
      event.preventDefault()
      const inviteData={
        phone:phoneRef.current.value,
        groupname:param.groupname
      }
      try{
        console.log(searchParams.get('id'))
         const response=await fetch(`http://16.171.19.58:3000/groupchat/invite/${searchParams.get('id')}`,
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
    //const path=`/home/:${param.groupname}/groupdetails`
    const pth=`/home/groupdetails/${searchParams.get('id')}`
    const groupBtnClass=isMobile?'text-center text-success border border-ridge border-success rounded   w-100':'text-center text-success border border-ridge border-success rounded w-25'
    const chatsClass=isMobile?'fw-bolder border rounded mb-2 w-75 h-auto mw-100 mx-5 shadow-sm':'fw-bolder border rounded mb-2 w-50 h-25 mw-100 mx-5 shadow-sm'
    const msgFormClass=isMobile?'d-flex flex-row  w-75 position-fixed':'d-flex flex-row  w-50'
    return(
        <SideBar isMobile={isMobile} isHide={true}>
           {searchParams.get('id') && <Col className="chatspace">
             <Link to={pth} className=''><h2 className='w-100'>{param.groupname}</h2></Link>
             {error && <p>{error}</p>}
            
               <div className='chats'>
                <div className='border border-ridge  my-2 h-50 mx-2 bg-white'>
                  <h4 className='text-center'>{param.groupname}</h4>
                  <h5 className='text-center text-secondary mb-2'>{currentUser.length>0 && currentUser[0].name.phone===searchParams.get('created')?'You':`${searchParams.get('created')}`} Created The Group</h5>
                  <div className='d-flex justify-content-center align-items-center  mb-2' role='button'>
                  <div className={groupBtnClass} onClick={()=>{navigate(`/home/groupdetails/${searchParams.get('id')}`)}}>Group Details</div>
                  </div>
                 {currentUser.length>0 && currentUser[0].isMember && <div className='d-flex justify-content-center  align-items-center' role='button'>
                  <div className={groupBtnClass} role='button' onClick={()=>navigate('/search',{state:searchParams.get('id')})}>Add Member</div>
                  </div>}
                </div>
                <div>
                <p className='text-secondary fw-bolder w-75'> {currentUser.length>0 &&  currentUser[0].name.phone===searchParams.get('created')?'You joined':`${searchParams.get('created')} added you`}</p>
        
                {messages && messages.map(msg=>

                <div className={currentUser.length>0 && currentUser[0].name.phone===msg.phone?'d-flex  flex-column align-items-end':'d-flex flex-column'}>
                <div className={chatsClass} style={currentUser.length>0 && currentUser[0].name.phone===msg.phone?{background:'#98FB98'}:{background:'white'}} >
                   
                  <div className='d-flex justify-content-between mx-2'><h6 style={{color:'#FF1493'}}>{msg.sendername }</h6> <h6 className='text-secondary  fw-bold ' style={{fontSize:'13px'}}>{ msg.phone}</h6></div>
                   <div className='text-start mx-2'><h6 >{msg.message}</h6></div>
                  
                   <div className='text-end mx-2 fw-light ' style={{fontSize:'13px'}}>{new Date(msg.createdAt).getHours()+':'+new Date(msg.createdAt).getMinutes()}</div>
                   </div>
                   </div>
                )}
                </div>
                </div>
               
           <div >
           
             <div className='invite-button'>
                {!inviteForm && searchParams.get('id') && currentUser.length>0 && currentUser[0].isMember && <Button className='btn-secondary h-50' onClick={()=>setInviteForm(true)}>Invite Using Link</Button>}
                {inviteForm && <Form  onSubmit={handleInviteLink}>
                    <Form.Group>
                      
                        <Form.Label>Enter Mobile Number</Form.Label>
                        <Form.Control type='number' ref={phoneRef}/>
                    </Form.Group>
                    <Button className='btn-warning' type='submit'>Send Invite Link</Button>
                </Form>}
             </div>
             {currentUser.length>0 && !currentUser[0].isMember && <div className='text-danger bg-warning text-center w-75 fs-5'>You Are No Longer A Member Of This Group</div>}
              {searchParams.get('id') && currentUser.length>0 && currentUser[0].isMember && <Form className={msgFormClass} onSubmit={handleSendMessage} >
                     <Form.Control type="text" name="chat" ref={chatRef} className=' border border-black' />
                 <Button className="mx-2" type="submit" >Send</Button>
              </Form>}
            </div>
           
            </Col> }
           
        </SideBar>
    )
}

export default ChatSpace