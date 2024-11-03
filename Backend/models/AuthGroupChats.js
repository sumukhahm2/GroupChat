const Sequelize=require('sequelize')

const sequelize=require('../database/db')

const AuthGroupChat=sequelize.define('authgroupchat',{
    
    
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false  
    },
    isMember:{
        type:Sequelize.BOOLEAN,
        allowNull:false,  
        defaultValue:true
    }
    
})

module.exports=AuthGroupChat