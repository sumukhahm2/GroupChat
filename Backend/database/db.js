const Sequelize=require('sequelize')


const sequelize=new Sequelize('groupchat','root','Thirthahalli@1',
    {
        
    dialect:'mysql',
    host:'localhost'
    }
)

module.exports=sequelize