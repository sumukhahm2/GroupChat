const Chat=require('../models/chat')
const jwt=require('jsonwebtoken')
postMessages=async(req,res,next)=>{
     console.log(req.body)
   
    try{
        const data=jwt.verify(req.body.token,'wuCCWAcqs7yGQm82QhuXTJep6hRqMUdZQfqSFaVSZHwY3I5kHLpRqWRtFdRKDqJ')
        console.log(data)
        const chatData={
            message:req.body.message,
            authId:data.userId
        }
       const response=await Chat.create({...chatData})

       if(response){
        res.status(201).json({message:'Message sent Successfully'})
       }
       else 
         throw new Error("Something went Wrong")
    }
    catch(error){
       res.status(500).json({error:error.message})
    }

}

getAllMessages=async(req,res,next)=>
{
    try{
        const messages=await Chat.findAll()

        if(messages)
           res.status(201).json({messages:messages})
        else 
           res.status(404).json({error:'No messages Found'})
    }
    catch(error)
    {
       res.status(500).json({error:error})
    }
}

getMessages=async(req,res,next)=>{
    try{
        //console.log(req.user)
       const messages=await req.user.getChats()
       console.log(messages)
       if(messages.length>0)
         return res.status(201).json({messages:messages})
       else 
       return res.status(404).json({error:"No Messages Found"})
    }
    catch(error){
        res.status(500).json({error:error})
    }
}

module.exports={postMessages,getMessages,getAllMessages}