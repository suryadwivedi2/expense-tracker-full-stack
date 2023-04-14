
const bcryt = require('bcrypt');
const sequelize = require('../util/database');
const Sib=require("sib-api-v3-sdk");
require('dotenv').config();



exports.resetpass=(req,res,next)=>{
   const email=req.body.email;
   const client = Sib.ApiClient.instance
   const apiKey = client.authentications['api-key']
   apiKey.apiKey=process.env.API_KEY
   const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
    email: 'bcae2.08924402018@gmail.com',
    name: 'Surya',
}
const receivers = [
    {
        email: email,
    },
]
tranEmailApi
    .sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Subscribe to Cules Coding to become a developer',
        textContent: `Cules Coding will teach you how to become a developer`,
       // html: `<a href="">Reset password</a>`
    })
    .then((result)=>{res.status(200).json(result)})
    .catch((err)=>res.status(400).json(err))
}