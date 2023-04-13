const Expense = require('../models/expenses');
const bcryt = require('bcrypt');
const User=require('../models/user-details');
const expense = require('../models/expenses');
const sequelize = require('../util/database');

exports.addexpense=async(req,res,next)=>{
const t=await sequelize.transaction();
 try{
     const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    const id=req.user.id;
    const totalexpenses=Number(req.user.totalexpense)+Number(amount);
    await Expense.create({amount:amount,description:description,category:category,userId:id},{transaction:t})
    await  User.update({totalexpense:totalexpenses},{where:{id:id},transaction:t})
    await t.commit();
    res.status(200).json({"message":'successfullycreated'});
}catch(err){
        await t.rollback();
        res.status(400).json(err);
    }
}

exports.getuser=async(req,res,next)=>{
    try{
     const products=await Expense.findAll({where:{userId:req.user.id}})
     res.status(200).json(products);
    }catch(err){
        res.status(400).json(err);
    };
}

exports.deleteexpense=async(req,res,next)=>{
    const t=await sequelize.transaction();
    try{
     const expid=req.params.id;
     const uid=req.user.id;
     const expense=await Expense.findOne({where:{id:expid}});
     const updatedexpense=Number(req.user.totalexpense)-Number(expense.amount);
     await Expense.destroy({where:{id:expid,userId:uid},transaction:t})
     await User.update({totalexpense:updatedexpense},{where:{id:uid},transaction:t})
        await t.commit();
        res.status(200).json({message:'succefully deleted'});
    } catch(err){
        await t.rollback();
        res.status(401).json({err});
    }
    
}
