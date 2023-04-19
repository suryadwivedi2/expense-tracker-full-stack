const User = require('../models/user-details');
const Expenses=require('../models/expenses');
const bcryt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Razor=require('razorpay');
const Order=require('../models/order');
const sequelize = require('../util/database');
const { fn } = require('sequelize');
const AWS=require('aws-sdk');
//const dotenv=require('dotenv').config();

const generatetoken=(id,ispremium)=>{
    return jwt.sign({userId:id,ispremium},'8738654326758615762675');
}


exports.purchasemembership=(req,res,next)=>{
    const rzp=new Razor({
        key_id:'rzp_test_2JipZf3VKn4c2u',
key_secret:'6jdUCL9hkQkY836YmsYfgAAx'
})
const amount=25000;
rzp.orders.create({amount,currency:"INR"},(err,order)=>{
    if(err){
        throw new Error(err);
    }
    req.user.createOrder({orderId:order.id,status:"PENDING"}).then(()=>{
        return res.status(201).json({order,key_id:rzp.key_id})
    })
}).catch(err=>{
    res.status(401).json({message:'something went wrong'})
})
}






exports.updatetransaction=(req,res,next)=>{
const payment_id=req.body.payment_id;
const order_id=req.body.order_id;
//console.log(payment_id+" "+order_id);
const userId=req.user.id;

if(payment_id==undefined){
    Order.findOne({where:{orderId:order_id}}).then(order=>{
        order.update({paymentId:payment_id,status:"FAILED"}).then(()=>{
        return res.status(201).json({success:false,message:'transaction failed'});
       }).catch(err=>{
        console.log(err)
       })
        })
}else{
Order.findOne({where:{orderId:order_id}}).then(order=>{
    order.update({paymentId:payment_id,status:"SUCCESSFULL"}).then(()=>{
   req.user.update({ispremium:true}).then(()=>{
    return res.status(201).json({success:true,message:'transaction successfull',token:generatetoken(userId,true)});
   }).catch(err=>{
    console.log(err)
   })
    }).catch(err=>{
        console.log(err)
    })
}).catch(err=>{
    console.log(err);
})}
}


exports.showleaderboard=async (req,res,next)=>{
    try{
        const leaderboardofuser=await User.findAll({
            order:[['totalexpense',"DESC"]]
        })
        res.status(201).json(leaderboardofuser);
    }catch(err){
    res.status(401).json({err});
}
}

function uploadtos3(data,filename){
 const BUCKET_NAME='expensetracker12344';
 const IAM_USER_KEY='AKIA2F5APAKAGZTYZTU7';
 const IAM_USER_SECRET='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';

 let s3bucket=new AWS.S3({
    accessKeyId:IAM_USER_KEY,
    secretAccessKey:IAM_USER_SECRET
 })

  var params={
    Bucket:BUCKET_NAME,
    Key:filename,
    Body:data,
    ACL:'public-read'
  }
  return new Promise((resolve,reject)=>{
      s3bucket.upload(params,(err,data)=>{
        if(err){
            console.log('something went worng',err);
            reject(err)
        }else{
            console.log("success",data);
            resolve(data.Location);
        }
      })
  })
}


exports.downloadexpense=async (req,res,next)=>{
    try{
        const expenses=await req.user.getExpenses();
        console.log(expenses)
        const  stringfiedexpenses=JSON.stringify(expenses);
        const userId=req.user.id;
        const filename=`Expense/${userId}/${new Date}.txt`;
        const fileURL=await uploadtos3(stringfiedexpenses,filename);
        res.status(200).json({fileURL,succes:true})
    }catch(err){
   console.log(err);
    }
}