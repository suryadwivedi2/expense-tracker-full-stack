const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');

const app=express();

const userroute=require('./routes/user');
const expenseroute=require('./routes/expenses');
const User=require('./models/user-details');
const Expenses=require('./models/expenses');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/expense',userroute);
app.use('/user',expenseroute);
User.hasMany(Expenses);
Expenses.belongsTo(User);


sequelize
//.sync({force:true})
.sync()
.then(()=>{
    app.listen(4000);
}).catch(err=>
    console.log(err));
