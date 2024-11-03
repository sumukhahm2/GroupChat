
import { Dropdown } from "react-bootstrap"
import { BsThreeDotsVertical } from "react-icons/bs";


const CustomDropDown=({items,contact,selectedItem,name})=>{

    return(
        <div className="">
            <Dropdown>
      <Dropdown.Toggle variant="transparent" id="dropdown-basic">
       {name==='vertical-dot'?<BsThreeDotsVertical/>:name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map(item=>
        <>
        {item==='invites'?<Dropdown.Item onClick={selectedItem()}>Invites <span className='invite-count'>{invites.length>0?invites.length:0}</span></Dropdown.Item>:
        <Dropdown.Item onClick={()=>selectedItem({item:item,contact:contact})} >{item}</Dropdown.Item>}
        </>
        )}

      </Dropdown.Menu>
    </Dropdown>
     
        </div>
    )
}

export default CustomDropDown