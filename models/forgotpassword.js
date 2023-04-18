const Sequelize=require('sequelize');

const sequelize=require('../util/database');


const forgotpass=sequelize.define('forgotpass',{
    id:{
        type:Sequelize.UUID,
        allowNull:true,
        primaryKey:true
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
})

module.exports=forgotpass;