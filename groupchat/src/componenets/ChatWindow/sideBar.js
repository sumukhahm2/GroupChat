
import {Container,Row,Col} from 'react-bootstrap'
import './sideBar.css'
import { useSelector } from 'react-redux'


const SideBar=(props)=>{
const groupnames=useSelector(state=>state.chat.groupnames)
console.log(groupnames)

const handleChangeGroup=(groupData)=>{
   props.changeGroup(groupData)
}
    return(
        <Container className='bg-info side-bar' >
           <Row>
              <ul className='grouplists'>

                {groupnames.map(name=>
                <>
                <li key={name.id} className='grouplist' onClick={handleChangeGroup.bind(null,name)}>{name.groupname}</li>
                </>
                )}
                
              </ul>
           </Row>
        </Container>
    )
}
export default SideBar