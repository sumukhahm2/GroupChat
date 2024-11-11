
const sequelize = require("../database/db");

const Sequelize=require('sequelize')


const Auth=sequelize.define('auth',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
        
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password: { 
        type:Sequelize.STRING,
        allowNull:false,
        
},
phone:{
    type:Sequelize.STRING, 
    allowNull:false,
    unique:true
}
})

module.exports=Auth


