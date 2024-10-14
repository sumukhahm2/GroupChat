const sequelize=require('../database/db')
const Sequelize=require('sequelize')
const bcrypt=require('bcrypt')
const Auth=require('../models/auth')
const jwt=require('jsonwebtoken') 


postSignUpAuthentication=async(req,res,next)=>{
    
    try{
      const checkCredentials= await searchCredentials({
         email:req.body.email,
         phone:req.body.phone
       })
      console.log(checkCredentials)
       if(checkCredentials.status)
       {
        const signUpData={
            username:req.body.name,  
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone
        }
        console.log(signUpData)
        bcrypt.hash(signUpData.password,10,async(err,hash)=>{
            console.log(err)
            const response=await Auth.create({...signUpData,password:hash})

            if(response.error)
            {
                throw new Error(response.error)
            }
            else{
                res.status(201).json({
                    message:'User Created Successfully!'
                })
            }
        })
    }
    else
      throw new Error(checkCredentials.error)

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({error:error.message})
    } 
}

postSignInAuthentication=async(req,res,next)=>{
      const signInData={
        email:req.body.email,
        password:req.body.password
      }
     try{
        const user=await Auth.findAll({where:{email:signInData.email}})
   
       if(user.length!==0)
       {
         bcrypt.compare(signInData.password,user[0].password,(err,response)=>{
            if(err)
            {
                console.log(err)
                 
            }
            
            if(response)
            {
                    return  res.status(201).json({message:'Login Successfully',token:generateAccessToken(user[0].id),email:user[0].email})
             } 
             else if(!response)
                return res.status(401).json({error:'Password MisMatch'}) 
              
        })
      }
      else{
        return res.status(404).json({error:'User Not Found'})
      }
         
        
     }
     catch(error){
         return res.status(500).json({error:error.message})
     }
}

const searchCredentials=(data)=>{
   return new Promise(async(resolve,reject)=>{
    const email=data.email;
    const phone=data.phone
    console.log(email)
      try{
          const user=await Auth.findOne({where:{email:email}})
          if(user)
           resolve({error:'Email Already Exists',status:false})
          else
          {
            const user=await Auth.findOne({where:{phone:phone}})
             if(user)
                 resolve({error:'Phone Number Already Exists',status:false})
             else
               resolve({message:'Success',status:true})   

          }
          
      }
      catch(error){
         reject(error)
      }
   })
}

const generateAccessToken=(userId)=>{
    return jwt.sign({userId:userId},'wuCCWAcqs7yGQm82QhuXTJep6hRqMUdZQfqSFaVSZHwY3I5kHLpRqWRtFdRKDqJ')
}

module.exports={postSignUpAuthentication,postSignInAuthentication}