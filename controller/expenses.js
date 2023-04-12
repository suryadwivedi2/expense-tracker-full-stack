const Expense = require('../models/expenses');
const bcryt = require('bcrypt');
const User=require('../models/user-details');
const expense = require('../models/expenses');
const sequelize = require('../util/database');

exports.addexpense=async(req,res,next)=>{
const t=await sequelize.transaction();
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    const id=req.user.id;
    const totalexpenses=Number(req.user.totalexpense)+Number(amount);
    Expense.create({
        amount:amount,
        description:description,
        category:category,
        userId:id
        },{transaction:t}).then((result)=>{
          User.update({totalexpense:totalexpenses},{
                where:{id:id},transaction:t
            }).then(async(result)=>{
                await t.commit();
                res.status(200).json({"message":'successfullycreated'});
            }).catch(async (err)=>{
                await t.rollback();
                console.log(err);
            })
        })
    .catch(async(err)=>{
        await t.rollback();
        console.log(err);
    })
}


exports.getuser=(req,res,next)=>{
    Expense.findAll({where:{userId:req.user.id}}).then(products=>{
        res.json(products);
    }).catch(err=>console.log(err));
}

exports.deleteexpense=(req,res,next)=>{
    const expid=req.params.id;
    const uid=req.user.id;
    //let updatedexpense=Number(req.user.totalexpense)-Number(req.expense.amount);
    Expense.destroy({where:{id:expid,userId:uid}})
    .then((expense)=>{
        // User.update({totalexpense:updatedexpense},{
        //     where:{id:uid}
        // }).then(()=>{
             res.status(200).json({message:'succefully deleted'});
        // }).catch(err=>{
        //     console.log(err);
        // })
    }).catch((err)=>console.log(err));
}
