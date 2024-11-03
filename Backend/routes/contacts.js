const express=require('express')

const route=express.Router()

const contactControler=require('../controler/contacts')

const authorization=require('../middleware/userAuthentication')



route.post('/groupchat/addcontact',authorization.userAuthentication,contactControler.postContacts)

route.get('/groupchat/getcontacts',authorization.userAuthentication,contactControler.getContacts)

module.exports=route