
import {Container,Row,Col} from 'react-bootstrap'
import './sideBar.css'
import DropDownMenu from './DropDownMenu'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useFetch from '../../CustomHooks/useFetch'

const SideBar=(props)=>{
const groupnames=useSelector(state=>state.chat.groupnames)
console.log(props.isMobile+' '+props.isHide)
useFetch('http://localhost:4000/groupchat/getgroups','All_Groups')

    return(
           <Row  >
            <Col className={props.isMobile && props.isHide?'d-none':' side-bar col-lg-2 col-md-2 col-sm-12  '}>
              <ul className='grouplists'>

                {groupnames.length>0 && groupnames.map(name=>
                <>
                {console.log(name.createdPhone)}
                <Link key={name.id} className='grouplist'  to={`/home/${name.groupname}?id=${name.id}&created=${name.createdPhone}`} reloadDocument>{name.groupname}</Link>
                </>
                )}
                
              </ul>
              </Col>
              <Col className={props.isMobile && !props.isHide?'d-none':'col-lg-10 col-md-10 col-sm-12'}>
              
                {props.children}
             </Col>


           </Row>
    )
}
export default SideBar