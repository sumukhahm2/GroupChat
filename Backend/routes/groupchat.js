const express=require('express')

const route=express.Router()

const groupchatControler=require('../controler/groupchat')

const authentication=require('../middleware/userAuthentication')

route.post('/groupchat/creategroup',authentication.userAuthentication,groupchatControler.postCreateGroup)

route.get('/groupchat/getgroups',authentication.userAuthentication,groupchatControler.getGroupNames)

route.get('/groupchat/joingroup/:groupid',authentication.userAuthentication,groupchatControler.postJoinGroup)

route.post('/groupchat/invite/:groupid',authentication.userAuthentication,groupchatControler.sendInviteLink)

route.get('/groupchat/invites',authentication.userAuthentication,groupchatControler.getInvitedDatas)

route.get('/groupchat/groupdetails',groupchatControler.getGroupDetails)

route.post('/groupchat/updateauthority',groupchatControler.postUpdateAuthority)

route.post('/groupchat/addmember',authentication.userAuthentication,groupchatControler.postAddMemberToGroup)

route.post('/groupchat/exitgroupfromcreator',authentication.userAuthentication,groupchatControler.exitFromGroup)

route.post('/groupchat/exitgroup',groupchatControler.exitFromGroup)
module.exports=route