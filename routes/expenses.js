const express=require('express');

const expensecontroller=require('../controller/expenses');
const auth=require('../middleware/authorization.js');

const router=express.Router();

router.post('/add-expense',auth.authenticate,expensecontroller.addexpense);

router.get('/get-expense',auth.authenticate,expensecontroller.getuser);

router.delete('/delete-expense/:id',auth.authenticate,expensecontroller.deleteexpense)


module.exports=router;