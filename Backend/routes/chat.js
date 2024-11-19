const express=require('express')

const route=express.Router()

const chatControler=require('../controler/chat')

const authentication=require('../middleware/userAuthentication')

const S3BucketControler=require('../controler/S3Bucket')

route.post('/groupchat/send',authentication.userAuthentication,chatControler.postMessages)

route.get('/groupchat/chats',authentication.userAuthentication,chatControler.getMessages)

route.get('/groupchat/allchats',chatControler.getAllMessages)

route.post('/groupchat/upload',authentication.userAuthentication,S3BucketControler.addDocuments,chatControler.postMessages)

module.exports=route