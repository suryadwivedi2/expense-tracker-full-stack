const bcryt = require('bcrypt');
const sequelize = require('../util/database');
const Sib=require('sib-api-v3-sdk');

exports.resetpass=(req,res,next)=>{
try{
const email=req.body.email;
const client=Sib.ApiClient.instance;
const apikey=client.authentications['api-key'];
apikey.apikey='xsmtpsib-2a241957c27b81087d506234f95efd528026979afb53c20d3baf3707ff2521eb-Jg24PrZaSYvOA8FH'
const tranEmailApi=new Sib.TransactionalEmailsApi();
const sender={
    email:'bcae2.08924402018@gmail.com'
}
const receiver={
    email:email
}

tranEmailApi.sendTransacEmail({
    sender,
    to:receiver,
    subject:'reset password',
    textContent:'reset your password'
}).then((res)=>{
    console.log(res);
    res.status(200).json(email)
}).catch(err=>{
    console.log(err);
})

}catch(err){
    res.status(400).json(err);
}
}