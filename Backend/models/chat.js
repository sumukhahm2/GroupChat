const Sequelize=require('sequelize')

const sequelize=require('../database/db')

const Chat=sequelize.define('chat',{
    
    
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    message:{
        type:Sequelize.TEXT,
        allowNull:false,  
    },
    sendername:{
        type:Sequelize.STRING,
        allowNull:false,  
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false, 
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    
    
})

module.exports=Chat