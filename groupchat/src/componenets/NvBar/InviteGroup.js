


const InviteGroup=()=>{
    const handleJoinGroup=async(data)=>{
        const response=await fetch(data.inviteurl,{
          method:'GET',
          headers:{
            'Authorization':localStorage.getItem('token')
          }
        })

        const resData=await response.json()
        console.log(resData)
        if(resData && resData.message)
          alert(resData.message)
    }

    return(
        <div className='invites'>
        <h3 className='bg-warning border rounded text-light'>Invited Links</h3>
        <ul>
        {inviteData.length>0?inviteData.map(data=>
          <li className='invite-lists'>
              <p className='bg-secondary border rounded text-light'>{data.invitephone}</p>
              <p>{data.inviteuser} invited You to join the group  <br/><span className='text-secondary fs-3'>{data.invitegroup}</span></p>
              <p className='bg-success border rounded text-light'>Invited By:- {data.inviteuser}</p>
              <p className='bg-light border rounded text-light'>link :- <button className='btn-link border-0 bg-transparent text-primary ' onClick={handleJoinGroup.bind(null,data)}>{data.inviteurl}</button></p>
            </li>
        ):<p>No Invites</p>}
        </ul>
    </div>
    )
}

export default InviteGroup