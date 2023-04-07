const Expense = require('../models/expenses');
const bcryt = require('bcrypt');


exports.addexpense=(req,res,next)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;

    Expense.create({
        amount:amount,
        description:description,
        category:category
    }).then(()=>{
        res.status(200).json({amount});
    }).catch((err)=>{
        console.log(err);
    })
}


exports.getuser=(req,res,next)=>{
    Expense.findAll().then(products=>{
        res.json(products);
    }).catch(err=>console.log(err));
}

exports.deleteexpense=(req,res,next)=>{
    const expid=req.params.id;
    Expense.destroy({where:{id:expid}})
    .then(()=>{
         res.status(200).json({expid});
    }).catch((err)=>console.log(err));
}
