const express=require('express');


const purchasecontroller=require('../controller/purchase.js');
const auth=require('../middleware/authorization.js');

const router=express.Router();


router.get('/purchase-premium',auth.authenticate,purchasecontroller.purchasemembership);
router.post('/update-transaction',auth.authenticate,purchasecontroller.updatetransaction);
router.post('/show-leaderboard',purchasecontroller.showleaderboard);

module.exports=router;