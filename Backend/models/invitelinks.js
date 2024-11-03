const sequelize=require('../database/db')

const Sequelize=require('sequelize')


const InviteLinks=sequelize.define('invitelinks',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    inviteurl:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    inviteuser:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    invitephone:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    invitegroup:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

module.exports=InviteLinks