
const GroupChat=require('../models/groupchat')
const Auth=require('../models/auth')
const Sib=require('sib-api-v3-sdk')
const InviteLinks=require('../models/invitelinks')
postCreateGroup=async(req,res,next)=>{
    console.log(req.user)
    try{
        const groupchat=await  GroupChat.create({groupname:req.body.groupName})
       await req.user.addGroupchat(groupchat)
        
        if(groupchat)
        {
            res.status(201).json({message:'Group Created SuccessFully',groupId:groupchat.dataValues.id})
        }
    }
    catch(error)
    {
          console.log(error)
    }
   
}

getGroupNames=async (req,res,next)=>{
    try{
       const groupNames=await req.user.getGroupchats()
       
       console.log(groupNames)
       if(groupNames)
         return res.status(201).json({data:groupNames})
        else  
          return res.status(404).json({error:'No Groups Found'})
    }
    catch(error)
    {
       return  res.status(500).json({error:error.message})
    }
}
getGroupDatas=async(req,res,next)=>{
     const users=await GroupChat.findAll(
     ) 
     console.log(users)

}

postJoinGroup=async(req,res,next)=>{
    try{
       const groupId=req.params.groupid
       console.log(req.body)
       const groupchat=await GroupChat.findOne({where:{id:groupId}}
        
       )
       await req.user.addGroupchat(groupchat)
       res.status(201).json({message:`Successfully Joined to Group ${groupchat.groupname}`})

    }
    catch(error){
      res.status(500).json({error:error})
    }
}

sendInviteLink=async(req,res,next)=>{
    const groupId=req.params.groupid

   // console.log(groupId)
    try{

        if(req.body.phone)
        {
          const userData=await Auth.findOne({where:{phone:req.body.phone}})

          console.log(userData)
          const userDetails={
            inviteurl:`http://localhost:4000/groupchat/joingroup/${groupId}`,
            inviteuser:req.user.username,
            invitephone:req.user.phone,
            authId:userData.id
          }
          const inviteRequest=InviteLinks.create(userDetails)

        }
        else{
       
    }
    }
    catch(error)
    {
        console.log(error)
    }
    
}

getInvitedDatas=async(req,res,next)=>{

    try{
       const invites=await InviteLinks.findAll({where:{id:req.user.id}})
       console.log('invites'+invites)
       if(invites){
        res.status(201).json({data:invites})
       }
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
}





module.exports={postCreateGroup,getGroupNames,postJoinGroup,sendInviteLink,getInvitedDatas,getGroupDatas}