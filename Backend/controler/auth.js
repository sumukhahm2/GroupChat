const sequelize=require('../database/db')
const Sequelize=require('sequelize')
const bcrypt=require('bcrypt')
const Auth=require('../models/auth')
const jwt=require('jsonwebtoken') 
const Contacts=require('../models/contacts')

postSignUpAuthentication=async(req,res,next)=>{
    
    try{
      const checkCredentials= await searchCredentials({
         email:req.body.email,
         phone:req.body.phone
       })
     // console.log(checkCredentials)
       if(checkCredentials.status)
       {
        const signUpData={
            username:req.body.name,  
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone
        }
        //console.log(signUpData)
        bcrypt.hash(signUpData.password,10,async(err,hash)=>{
            //console.log(err)
            const response=await Auth.create({...signUpData,password:hash})

            if(response.error)
            {
                throw new Error(response.error)
            }
            else{
                 const contact=await Contacts.findOne({where:{phone:req.body.phone}})
                   if(contact)
                   {
                     await Contacts.update({isMember:true},{where:{phone:req.body.phone}})
                   }
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
       // console.log(error.message)
        return res.status(500).json({error:error.message})
    } 
}

postSignInAuthentication = async (req, res, next) => {
  console.log('Login endpoint called with data:');
  const signInData = {
      email: req.body.email,
      password: req.body.password
  };
  console.log(signInData); 
  console.log(req.url)
  try {
      let user;
      if (signInData.email !== undefined) {
          user = await Auth.findAll({ where: { email: signInData.email } });
      }
      console.log('hello');

      if (user && user.length !== 0) {
          // Use bcrypt.compare with a Promise to properly await the result
          const passwordMatch = await new Promise((resolve, reject) => {
              bcrypt.compare(signInData.password, user[0].password, (err, response) => {
                  if (err) return reject(err);
                  resolve(response);
              });
          });

          if (passwordMatch) {
              return res.status(201).json({
                  message: 'Login Successfully',
                  token: generateAccessToken(user[0].id, user[0].username, user[0].email, user[0].phone),
                  username: user[0].username,
                  email: user[0].email,
                  phone: user[0].phone
              });
          } else {
              // Incorrect password
              return res.status(401).json({ error: 'Password MisMatch' });
          }
      } else {
          // User not found
          return res.status(404).json({ error: 'User Not Found' });
      }
  } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ error: error.message });
  }
};

const searchCredentials=(data)=>{
   return new Promise(async(resolve,reject)=>{
    const email=data.email;
    const phone=data.phone
   // console.log(email)
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

const generateAccessToken=(userId,username,email,phone)=>{
    return jwt.sign({userId:userId,username:username,email:email,phone:phone},'wuCCWAcqs7yGQm82QhuXTJep6hRqMUdZQfqSFaVSZHwY3I5kHLpRqWRtFdRKDqJ')
}

module.exports={postSignUpAuthentication,postSignInAuthentication}