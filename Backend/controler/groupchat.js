
const GroupChat=require('../models/groupchat')
const Auth=require('../models/auth')
const Sib=require('sib-api-v3-sdk')
const InviteLinks=require('../models/invitelinks')
const AuthGroupChat=require('../models/AuthGroupChats')


postCreateGroup=async(req,res,next)=>{
   // console.log(req.user)
    const groupData={
        groupname:req.body.groupname,
        createdPhone:req.user.phone
    }
    try{
        const groupchat=await  GroupChat.create(groupData)
       // console.log()
       await req.user.addGroupchat(groupchat,{through:{isAdmin:true,isMember:true}})
       const group_members=req.body.members
       console.log(group_members)
       var members=[]
         
          for(let i=0;i<group_members.length;i++)
          {
            const user=await Auth.findOne({where:{phone:group_members[i]}})
            const obj={
              authId:user.id,
              groupchatId:groupchat.id
            }
            members.push(obj)
          }
          console.log(members)
          await AuthGroupChat.bulkCreate(members)
        
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
       
       //console.log('groups'+groupNames)
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


postJoinGroup=async(req,res,next)=>{
    try{
       const groupId=req.params.groupid
       //console.log(req.body)
       const groupchat=await GroupChat.findOne({where:{id:groupId}}
        
       )
       await req.user.addGroupchat(groupchat,{through:{isAdmin:false,isMember:true}})
       res.status(201).json({message:`Successfully Joined to Group ${groupchat.groupname}`})

    }
    catch(error){
      res.status(500).json({error:error})
    }
}

postAddMemberToGroup=async(req,res,next)=>{
    try{
        const phone=req.body.phone
        const groupId=req.body.groupId
      const user=await Auth.findAll({where:{phone:phone}})
     
       //console.log(user)
       if(user.length>0)
       {
          const group=await GroupChat.findOne({where:{id:groupId}})

             await user[0].addGroupchat(group,{through:{isAdmin:false,isMember:true}})
             res.status(201).json({message:'Member Added Successfully'})

       }
       else
         res.status(404).json({error:'Usser Not Registered in GroupChat App'})

    }
    catch(error)
    {
        console.log(error)
    }
}

sendInviteLink=async(req,res,next)=>{
    const groupId=req.params.groupid
   const groupname=req.body.groupname
   // console.log(groupId)
    try{

        if(req.body.phone)
        {
          const userData=await Auth.findOne({where:{phone:req.body.phone}})

          console.log(userData)
          const userDetails={
            inviteurl:`http://16.171.19.58:3000/groupchat/joingroup/${groupId}`,
            inviteuser:req.user.username,
            invitephone:req.user.phone,
            authId:userData.id,
            invitegroup:groupname
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
       const invites=await InviteLinks.findAll({where:{authId:req.user.id}})
       //console.log('invites'+invites)
       if(invites){
        res.status(201).json({data:invites})
       }
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
}

getGroupDetails=async(req,res,next)=>{
   const groupid=req.query.groupid
    try{
        const groupDetails=await AuthGroupChat.findAll({where:{groupchatId:groupid},
            attributes:['authId','isAdmin','isMember']
            }
        )
       //console.log('GROUP_DETAILS'+groupDetails)
     let usernames=[]
        for(let user=0;user<groupDetails.length;user++)
        {
            //console.log(groupDetails[user].dataValues)
           const name=await Auth.findOne({where:{id:groupDetails[user].authId},attributes:['username','phone'],include:[{model:GroupChat,attributes:['createdPhone']}]})
           usernames.push({...groupDetails[user].dataValues,name:name})
        }
      
        if(groupDetails)
        res.status(201).json({data:usernames})
        else
        res.status(404).json({error:'Something went Wrong'})
    }
    catch(error)
    {
      res.status(500).json({error:error.message})
    }
   
}

postUpdateAuthority=async(req,res,next)=>{
    const authId=req.body.authid
    const groupid=req.body.groupid
    const isAdmin=req.body.isAdmin
    try{

       
       const authgroupchat=await AuthGroupChat.update({isAdmin:!isAdmin},{where:{authId:authId,groupChatId:groupid}})
       //console.log(authgroupchat)
       
       if(authgroupchat)
       {
        res.status(201).json({data:authgroupchat})
       }
    }
    catch(error){
       res.status(500).json({error:error.message})
    }
}

exitFromGroup=async (req,res,next)=>{
    try{
       const groupId=req.body.groupId
       let response
       const users=await AuthGroupChat.findAll({where:{isMember:false}})
         
        if(req.user)
            response=await AuthGroupChat.update({isMember:false},{where:{authId:req.user.id,groupchatId:groupId}})
        else 
        {
           
          const authId=req.user.authId
          //console.log(authId)
         
          response=await AuthGroupChat.update({isMember:false},{where:{authId:authId,groupchatId:groupId}})
        }

        if(users.length===1)
        {
            await GroupChat.destroy({where:{id:groupId}})
            await AuthGroupChat.destroy({where:{groupchatId:groupId}})
        }
            
        

        res.status(201).json({message:'Successfully exited from Group'})

    }
    catch(error)
    {
      console.log(error)
    }
}


module.exports={
                postCreateGroup,
                getGroupNames,
                postJoinGroup,
                sendInviteLink,
                getInvitedDatas,
                getGroupDetails,
                postUpdateAuthority,
                postAddMemberToGroup,
                exitFromGroup
              }