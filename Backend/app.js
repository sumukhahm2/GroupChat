const express=require('express')

const dotenv=require('dotenv')
dotenv.config()

const path=require('path')

const sequelize=require('./database/db')

const bodyparser=require('body-parser')

const Auth=require('./models/auth')

const Chat=require('./models/chat')

const helmet=require('helmet')

const morgan=require('morgan')

const cors=require('cors')

const authRoute=require('./routes/auth')

const chatRoute=require('./routes/chat')

const app=express()





app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoute)
app.use(chatRoute)

Auth.hasMany(Chat)
Chat.belongsTo(Auth)

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


