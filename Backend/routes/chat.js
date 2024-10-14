const express=require('express')

const route=express.Router()

const chatControler=require('../controler/chat')


route.post('/groupchat/send',chatControler.postMessages)


module.exports=route