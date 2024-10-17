const { Op } = require('sequelize')
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
        res.status(201).json({message:response.dataValues})
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
       const messageId=parseInt(req.query.lastmessageid)
       //console.log(messageId)
       if(messageId>=0)
       {
        console.log('how'+messageId)
        
         const messages=await Chat.findAll({where:{id:{[Op.gt]:messageId}}})
         //console.log(messages)
         let msgId
        if(messages.length>0)
          msgId=messages[messages.length-1].id
        console.log('hello'+msgId)
         //console.log(msgId!=messageId)
         if(messages.length>0 && msgId!=messageId)
         {
            
            //console.log(messages)
            return res.status(201).json({messages:messages,status:true})
         }
         else
         {
            console.log('how')
           return res.status(201).json({status:false})
         }
            
       }
    }
    catch(error){

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