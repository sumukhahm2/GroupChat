const { Sequelize, DataTypes } = require('sequelize');

// Set up Sequelize connection
const sequelize = require('../database/db')



// Define the Backup Chat model
const ChatBackup = sequelize.define('chats_backup', {
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
    
});

module.exports=ChatBackup
