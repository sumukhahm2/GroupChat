
import {Button, Form,Col} from 'react-bootstrap'
import {useState} from 'react'
import useFetch from '../../CustomHooks/useFetch'
import { useSelector } from 'react-redux'
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Contacts from '../Contacts/contacts';
import { useLocation } from 'react-router-dom';

const SearchContact=(props)=>{
    
    const [searchItem,setSearchItem]=useState(null)
    const contacts=useSelector(state=>state.contact.contacts)
    const location=useLocation()

    const groupId=location.state
     console.log(location)
    let filterContacts=contacts
    if(searchItem)
     filterContacts=contacts.filter(item=>item.username.toLowerCase().includes(searchItem))
     
    return(
        <div>

            <Form className='d-flex m-2' >
                <Form.Group>
                    <Form.Control type="text" className='mx-2' onChange={(e)=>setSearchItem(e.target.value)} placeholder='Search Contacts...'/>
                </Form.Group>
            </Form>
             <Contacts type='invite-group' filter={filterContacts} groupId={groupId?groupId:null}/>
            
        </div>
    )
}

export default SearchContact