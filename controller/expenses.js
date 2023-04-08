const Expense = require('../models/expenses');
const bcryt = require('bcrypt');


exports.addexpense=(req,res,next)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    const id=req.user.id;
    Expense.create({
        amount:amount,
        description:description,
        category:category,
        userId:id
    }).then(()=>{
        res.status(200).json({"message":'successfullycreated'});
    }).catch((err)=>{
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
    Expense.destroy({where:{id:expid,userId:uid}})
    .then(()=>{
         res.status(200).json({message:'succefully deleted'});
    }).catch((err)=>console.log(err));
}
