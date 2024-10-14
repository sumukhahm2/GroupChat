const sequelize=require('../database/db')
const Sequelize=require('sequelize')
const bcrypt=require('bcrypt')
const Auth=require('../models/auth')


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

module.exports={postSignUpAuthentication}