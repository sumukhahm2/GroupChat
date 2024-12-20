
const GroupChat=require('../models/groupchat')
const Auth=require('../models/auth')
const Sib=require('sib-api-v3-sdk')
const InviteLinks=require('../models/invitelinks')
const AuthGroupChat=require('../models/AuthGroupChats')


const bulkAddMembers = async (group_members, groupchatId) => {
  try {
    const membersToAdd = [];
    const updatesToPerform = [];

    const users = await Promise.all(
      group_members.map((phone) => Auth.findOne({ where: { phone } }))
    );

    for (let user of users) {
      // Skip if user does not exist
      if (!user) continue;

      // Check if the user is already a member of the group
      const isMember = await AuthGroupChat.findOne({
        where: { authId: user.id, groupchatId },
      });

      if (!isMember) {
        // Prepare new member for bulk insert
        membersToAdd.push({
          authId: user.id,
          groupchatId,
        });
      } else {
        // Collect updates for existing members
        updatesToPerform.push(
          isMember.update({ isMember: true }) // Promise for updating `isMember`
        );
      }
    }

    console.log(`Members to add:`, membersToAdd);

    // Perform bulk create for new members
     await AuthGroupChat.bulkCreate(membersToAdd);

    // Perform all updates in parallel
    await Promise.all(updatesToPerform);
    // console.log(Auth.associations); // Should show GroupChat as an association
    // console.log(GroupChat.associations); // Should show Auth as an association
    const groupMembers = await AuthGroupChat.findAll({
      where: { groupchatId },
      attributes:['authId','groupchatId'],
      include: [
        {
          model: Auth, // Assuming `Auth` is the model where member names are stored
          attributes: ['phone'],
        },
      ],
    });

    // Extract member names
    const memberNames = groupMembers.map((member) => member.auth.phone);

    console.log('Member Names:', groupMembers);

    

    // Return created members as plain objects (optional)
    return memberNames
  } catch (error) {
    console.error('Error in bulkAddMembers:', error);
    throw error; // Throw error so it can be handled by the caller
  }
};

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
       data=await bulkAddMembers(group_members,groupchat.id)
      
        console.log('groupData:-- '+JSON.stringify(data))
        if(groupchat)
        {
           return res.status(201).json({message:'Group Created SuccessFully',groupInfo:{...groupchat.dataValues,members:data}})
        }
    }
    catch(error)
    {
          console.log(error)
    }
   
} 

postAddMemberToGroup=async (req,res,next)=>{
    const groupId= req.body.groupId
    const members=req.body.members
     const adminPhone=req.body.adminPhone
    console.log(req.body)
  try{
     const group=await req.user.getGroupchats({where:{id:groupId}})
     console.log(group)
     const data=await bulkAddMembers(members,groupId) 
     console.log(data)
     if(data)
     {
      res.send({message:'Members Added Successfully',data:data})
     }
  }
  catch(error){
      console.log(error)
  }
}

getGroupNames=async (req,res,next)=>{
    try{
       const groupNames=await req.user.getGroupchats()
       
       //console.log('groups'+groupNames)
       if(groupNames)
       {
        console.log('Group Names:- '+"Sending success response");
        return res.status(201).json({data:groupNames})
       }
       else {
        console.log("No groups found, sending 404 response");
        return res.status(404).json({ error: 'No Groups Found' });
    }
} catch (error) {
    console.log("Error occurred:", error.message);
    return res.status(500).json({ error: error.message });
}
}


postJoinGroup=async(req,res,next)=>{
    try{
       const groupId=req.params.groupid
       //console.log(req.body)
       const groupchat=await GroupChat.findOne({where:{id:groupId}}
        
       )
       await req.user.addGroupchat(groupchat,{through:{isAdmin:false,isMember:true}})
       return res.status(201).json({message:`Successfully Joined to Group ${groupchat.groupname}`})

    }
    catch(error){
      return res.status(500).json({error:error})
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
            inviteurl:`http://localhost:4000/groupchat/joingroup/${groupId}`,
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

getInvitedDatas = async (req, res, next) => {
    try {
        const invites = await InviteLinks.findAll({ where: { authId: req.user.id } });

        if (invites && invites.length > 0) {
            // If invites are found, send them back as a response
            return res.status(200).json({ data: invites });
        } else {
            // If no invites are found, send a 404 response
            return res.status(201).json({ message: 'No invites found' });
        }
    } catch (error) {
        // Handle any errors by sending a 500 response
        console.error("Error in getInvitedDatas:", error);
        return res.status(500).json({ error: error.message });
    }
};


getGroupDetails=async(req,res,next)=>{
   const groupid=req.query.groupid
    try{
        const groupDetails=await AuthGroupChat.findAll({where:{groupchatId:groupid},
            attributes:['authId','isAdmin','isMember'],
            // include:[
            //   {
            //     model:auth,
            //     attributes:['username','phone']
            //   }
            // ]
            }
        )
       console.log('GROUP_DETAILS'+groupDetails)
     let usernames=[]
        for(let user=0;user<groupDetails.length;user++)
        {
            //console.log(groupDetails[user].dataValues)
           const name=await Auth.findOne({where:{id:groupDetails[user].authId},attributes:['username','phone'],include:[{model:GroupChat,attributes:['createdPhone']}]})
           usernames.push({...groupDetails[user].dataValues,name:name})
        }
      
        if(groupDetails)
       return  res.status(201).json({data:usernames})
        else
       return  res.status(404).json({error:'Something went Wrong'})
    }
    catch(error)
    {
      return res.status(500).json({error:error.message})
    }
   
}

postUpdateAuthority=async(req,res,next)=>{
    const authId=req.body.authid
    const groupid=req.body.groupid
    const isAdmin=req.body.isAdmin
    try{

       
       const authgroupchat=await AuthGroupChat.update({isAdmin:!isAdmin},{where:{authId:authId,groupChatId:groupid}})
       console.log(authgroupchat)
       
       if(authgroupchat)
       {
       return  res.status(201).json({isAdmin:!isAdmin,groupId:groupid,id:authId,type:'update-admin'})
       }
    }
    catch(error){
      return  res.status(500).json({error:error.message})
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
           
          const authId=req.body.authId
          //console.log(authId)
         
          response=await AuthGroupChat.update({isMember:false},{where:{authId:authId,groupchatId:groupId}})
        }

        if(users.length===1)
        {
            await GroupChat.destroy({where:{id:groupId}})
            await AuthGroupChat.destroy({where:{groupchatId:groupId}})
        }
            
        

       return res.status(201).json({message:'Successfully exited from Group'})

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