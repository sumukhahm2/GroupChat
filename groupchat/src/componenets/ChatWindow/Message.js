import { useSelector } from "react-redux"

const Message = ({ msg, currentUser,isMobile}) => {


   
    // Check if the current message is from the logged-in user
    const isJson=(msg)=>{
        console.log(msg)
        try{
            return JSON.parse(msg)
            
        }
        catch(error){
             return false
        }
    }
    console.log(isJson(msg.message))
    console.log(msg)
     
    const isCurrentUser = currentUser.length > 0 && currentUser[0].name.phone === msg.phone;

    // Determine alignment class
    const alignmentClass = isCurrentUser ? 'align-items-end' : 'align-items-start';

    // Determine background style based on sender
    const backgroundColor = isCurrentUser ? '#98FB98' : 'white';
     
    const checkFileType=(type,src)=>{
        let renderTag
        const fileType=type.split('/')[0]
       if(fileType==='video')
         {
            renderTag= (
            <video controls width="300px">
             <source src={src} type={type}/>
              Your browser does not support the video tag.
           </video>)

         }
         else if(fileType==='audio')
         {
            renderTag= (<audio controls>
            <source src={src} type={type}/>
               Your browser does not support the audio element.
            </audio>)

         }
         else if(fileType==='image')
         {
            renderTag=<img src={src} width='300' alt=''/>
            
         }
         else
         {
            console.log(src)

            renderTag=(<embed src={src} width="500" height="375" 
                type={type}/>)
         }
         return renderTag
    }
    // Format the timestamp
    const formattedTime = `${new Date(msg.createdAt).getHours()}:${new Date(msg.createdAt).getMinutes().toString().padStart(2, '0')}`;
     const chatsClass=isMobile?'fw-bolder border rounded mb-2 w-auto h-auto mw-100 mx-5 shadow-sm':'fw-bolder border rounded mb-2 w-auto p-auto h-auto mw-100 mx-5 shadow-sm'
    return (
        <div className={`d-flex flex-column ${alignmentClass} w-auto `}>
            <div className={`${chatsClass}`} style={{ background: backgroundColor }}>
                
                <div className="d-flex justify-content-between mx-2">
                    <h6 style={{ color: '#FF1493' }}>{msg.sendername}</h6>
                    <h6 className="text-secondary fw-bold" style={{ fontSize: '13px' }}>{msg.phone}</h6>
                </div>
                <div className="text-start mx-2 d-block">
                    {!isJson(msg.message)?<h6>{msg.message}</h6>:isJson(msg.message).map(data=>
                        <div key={data.location} className='mb-2'>
                          {checkFileType(data.mimeType,data.location)}
                        </div>
                    )}
                </div>
                <div className="text-end mx-2 fw-light" style={{ fontSize: '13px' }}>{formattedTime}</div>
            </div>
        </div>
    );
};


export default Message