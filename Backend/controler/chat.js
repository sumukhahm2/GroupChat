const { Op, Model } = require('sequelize')
const Chat=require('../models/chat')
const jwt=require('jsonwebtoken')
const GroupChat = require('../models/groupchat')
const Auth=require('../models/auth')
postMessages=async(req,res,next)=>{
     //console.log(req.body)
   
    try{
        
        //console.log(data)
        const chatData={
            message:req.body.message,
            sendername:req.user.username,
            phone:req.user.phone,
            groupname:req.body.groupname,
            authId:req.user.id,
            groupchatId:req.body.groupId,
          
        }
       const response=await Chat.create({...chatData})
       //console.log(response)
    
       
       if(response){
        res.status(201).json({message:{...response.dataValues,phone:req.user.phone}})
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
       const groupchatId=req.query.groupchatid
       console.log('MsgId'+messageId)
       if(messageId>=0)
       {
        console.log('how'+messageId)
        
         const messages=await Chat.findAll({where:{id:{[Op.gt]:messageId},groupchatId:groupchatId},
          include:[{model:GroupChat,attributes:['id','groupname']}]
        })
         
         console.log('All Messages'+messages)
         let msgId
        if(messages.length>0)
          msgId=messages[messages.length-1].id
       // console.log('hello'+msgId)
         //console.log(msgId!=messageId)
         if(messages.length>0 && msgId!=messageId)
         {
            
            //console.log(messages)
            return res.status(201).json({data:messages,status:true,id:messageId})
         }
         else
         {
           // console.log('how')
           return res.status(201).json({status:false,id:messageId})
         }
            
       }
    }
    catch(error){
        console.log(error)
    }
}

getMessages=async(req,res,next)=>{
    try{
        //console.log(req.user)
       const messages=await req.user.getChats()
       //console.log(messages)
       if(messages.length>0)
         return res.status(201).json({data:messages})
       else 
       return res.status(404).json({error:"No Messages Found"})
    }
    catch(error){
        res.status(500).json({error:error})
    }
}

module.exports={postMessages,getMessages,getAllMessages}