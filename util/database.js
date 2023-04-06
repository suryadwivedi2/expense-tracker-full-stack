const Sequelize=require('sequelize')

const sequelize=new Sequelize('expensetracker','root','Surya@2001',{
    dialect:'mysql',
    host:'localhost'
})

    module.exports=sequelize;