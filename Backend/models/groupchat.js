const Sequelize=require('sequelize')

const sequelize=require('../database/db')

const GroupChat=sequelize.define('groupchat',{
    
    
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false,  
    },
    createdPhone:{
        type:Sequelize.STRING,
        allowNull:false, 
    }
    
})

module.exports=GroupChat