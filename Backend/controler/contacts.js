
const Contacts=require('../models/contacts')
const Auth =require('../models/auth')
postContacts=async(req,res,next)=>{

    try{
        const user=await Auth.findOne({where:{phone:req.body.phone}})
        let isMember=true
       // console.log(user)
     if(!user)
     {
        isMember=false
     }
     
     const contactData={
        username:req.body.name,
        phone:req.body.phone,
        authId:req.user.id,
        isMember:isMember
        
    }
   
   // console.log(contactData)
    
        const contact=await req.user.createContact(contactData)
        //console.log(contact)
        if(contact)
            res.status(201).json({data:contact,message:'Contact Created Successfully'})
     }
     catch(error)
     {
       res.status(500).json({error:error.message})
     }
}

getContacts=async(req,res,next)=>{

    try{
       const contacts=await req.user.getContacts()
     //console.log(contacts)

       if(contacts)
       {
        res.status(201).json({data:contacts})
       }
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
}
 

module.exports={postContacts,getContacts}