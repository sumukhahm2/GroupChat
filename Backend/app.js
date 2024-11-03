const express=require('express')

const dotenv=require('dotenv')
dotenv.config()

const path=require('path')

const sequelize=require('./database/db')

const bodyparser=require('body-parser')

const Auth=require('./models/auth')

const GroupChat=require('./models/groupchat')

const InviteLinks=require('./models/invitelinks')


const Chat=require('./models/chat')

const helmet=require('helmet')

const morgan=require('morgan')

const cors=require('cors')

const authRoute=require('./routes/auth')

const chatRoute=require('./routes/chat')

const contactRoute=require('./routes/contacts')

const groupChatRoute=require('./routes/groupchat')

const AuthGroupChat = require('./models/AuthGroupChats')

const Contact = require('./models/contacts')

const app=express() 





app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoute)
app.use(chatRoute)
app.use(groupChatRoute)
app.use(contactRoute)

 Auth.hasMany(Chat)
 Chat.belongsTo(Auth)

 Auth.hasMany(Contact)
 Contact.belongsTo(Auth)

Auth.belongsToMany(GroupChat,{ through: AuthGroupChat })
 GroupChat.belongsToMany(Auth,{ through: AuthGroupChat })

 GroupChat.hasMany(Chat)
 Chat.belongsTo(GroupChat) 

 Auth.hasMany(InviteLinks)
 InviteLinks.belongsTo(Auth)
   
app.use(helmet()) 
app.use(morgan('tiny'))


sequelize.sync()  
.then(result=>{
    app.listen(4000,()=>{
        console.log('listening port 4000')
    })
})
.catch(error=>{
    console.log(error) 
}) 


