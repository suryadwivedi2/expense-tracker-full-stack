const express=require('express');

const resetcontroller=require('../controller/resetpass');
//const auth=require('../middleware/authorization.js');

const router=express.Router();

router.post('/reset-password',resetcontroller.resetpass);


module.exports=router;