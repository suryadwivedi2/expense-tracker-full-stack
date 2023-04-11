const Exp = require('../models/user-details');
const bcryt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Razor=require('razorpay');
const Order=require('../models/order');
const { parse } = require('dotenv');
//const dotenv=require('dotenv').config();

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
console.log(payment_id+" "+order_id);
Order.findOne({where:{orderId:order_id}}).then(order=>{
    order.update({paymentId:payment_id,status:"SUCCESSFULL"}).then(()=>{
   req.user.update({ispremium:true}).then(()=>{
    return res.status(201).json({success:true,message:'transaction successfull'});
   }).catch(err=>{
    console.log(err)
   })
    }).catch(err=>{
        console.log(err)
    })
}).catch(err=>{
    console.log(err);
})
}