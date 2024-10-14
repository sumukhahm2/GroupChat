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

       console.log(response)
    }
    catch(error){
       res.status(500).json({error:error.message})
    }

}

module.exports={postMessages}