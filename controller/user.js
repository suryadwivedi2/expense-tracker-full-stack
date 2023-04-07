const Exp=require('../models/expense-details');



exports.addUser=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
let data={
    "name":name,
    "email":email,
    "password":password
}
    Exp.create({
        name:name,
        email:email,
        password:password
    }).then(()=>{
       res.status(201).json({userdetails:data});
    }).catch(err=>{
        res.status(500).json('something went wrong');
    })
}


exports.loginUser=(req,res,next)=>{
const email=req.body.email;
const password=req.body.password;
}