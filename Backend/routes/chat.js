const express=require('express')

const route=express.Router()

const chatControler=require('../controler/chat')

const authentication=require('../middleware/userAuthentication')


route.post('/groupchat/send',authentication.userAuthentication,chatControler.postMessages)

route.get('/groupchat/chats',authentication.userAuthentication,chatControler.getMessages)

route.get('/groupchat/allchats',chatControler.getAllMessages)

module.exports=route