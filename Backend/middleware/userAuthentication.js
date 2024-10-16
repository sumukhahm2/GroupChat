const Auth=require('../models/auth')
const jwt=require('jsonwebtoken')

userAuthentication=async(req,res,next)=>{

    try{
        const token=req.header('Authorization')

        const data=jwt.verify(token,'wuCCWAcqs7yGQm82QhuXTJep6hRqMUdZQfqSFaVSZHwY3I5kHLpRqWRtFdRKDqJ')

        const user=await Auth.findByPk(data.userId)

        req.user=user

        next()
    }
    catch(error)
    {

    }
}

module.exports={userAuthentication}