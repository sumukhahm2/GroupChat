const Sequelize=require('sequelize')

const sequelize=require('../database/db')

const Contacts=sequelize.define('contacts',{
    
    
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,  
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,  
        unique:true
    },
    isMember:{
        type:Sequelize.BOOLEAN,
        allowNull:false,  
        
    }
    
    
})

module.exports=Contacts