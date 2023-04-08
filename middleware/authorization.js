const User=require('../models/user-details');
const jwt=require('jsonwebtoken');


exports.authenticate=(req,res,next)=>{
    const token=req.header('Authorization');
    const user=jwt.verify(token,'8738654326758615762675');
    //console.log(user);  
    User.findByPk(user.userId)
        .then((user)=>{
            //console.log('userid>>>>>>>>'+" "+userid);

           // console.log(user);
            req.user=user;
            next();
        }).catch((err)=>{
            return res.status(400).json({err});
        })
}
