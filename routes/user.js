const express=require('express');

const usercontroller=require('../controller/user');
const router=express.Router();


router.post('/add-user',usercontroller.addUser);





module.exports=router;