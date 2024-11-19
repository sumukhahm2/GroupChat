const express=require('express')

const dotenv=require('dotenv')
dotenv.config()

const cronJob=require('./controler/cronsjob')

const http= require('http')

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



const socketIo = require('socket.io');

const socketEvents=require('./sockets/socket')

const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      "ExposeHeaders": ["Content-Disposition"],
    }
  });
console.log('socket events')
socketEvents(io)

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

 AuthGroupChat.belongsTo(Auth, { foreignKey: 'authId' }); 
Auth.hasMany(AuthGroupChat, { foreignKey: 'authId' });

AuthGroupChat.belongsTo(GroupChat, { foreignKey: 'groupchatId' });
GroupChat.hasMany(AuthGroupChat, { foreignKey: 'groupchatId' });

 GroupChat.hasMany(Chat)
 Chat.belongsTo(GroupChat) 

 Auth.hasMany(InviteLinks)
 InviteLinks.belongsTo(Auth)

//  const _dirname=path.dirname("")
// const buildPath=path.join(_dirname,"../groupchat/build")

// app.use(express.static(buildPath))

// app.use((req,res)=>{
//     res.sendFile(
//         path.join(__dirname,"../groupchat/build/index.html")
//     )
// })
   
app.use(helmet()) 
app.use(morgan('tiny'))

cronJob()
sequelize.sync()  
.then(result=>{
        
    const port=process.env.PORT||4000

    
    server.listen(port, () => {
        console.log(`Sample app listening at http://localhost:${port}`)
     })
})
.catch(error=>{
    console.log(error) 
}) 


