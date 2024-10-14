const express=require('express')

const route=express.Router()

const authControler=require('../controler/auth')



route.post('/groupchat/signup',authControler.postSignUpAuthentication)
route.post('/groupchat/signin',authControler.postSignInAuthentication)

module.exports=route

 