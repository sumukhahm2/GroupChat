const express=require('express')

const route=express.Router()

const authControler=require('../controler/auth')



route.post('/groupchat/signup',authControler.postSignUpAuthentication)

module.exports=route

 