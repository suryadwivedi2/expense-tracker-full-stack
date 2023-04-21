const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const Sib=require('sib-api-v3-sdk');
const cors=require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
const sequelize=require('./util/database');
const fs=require('fs');
const app=express();

const userroute=require('./routes/user');
const expenseroute=require('./routes/expenses');
const purchaseroute=require('./routes/purchase');
const resetroute=require('./routes/resetpass');
const User=require('./models/user-details');
const Expenses=require('./models/expenses');
const Order=require('./models/order');
const Forgotpassword=require('./models/forgotpassword');

const accesslogstream=fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {
        flags:'a'
    }
)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined',{stream:accesslogstream}));


app.use('/expense',userroute);
app.use('/user',expenseroute);
app.use('/premium',purchaseroute);
app.use('/called',resetroute);
User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);


sequelize
//.sync({force:true})
.sync()
.then(()=>{
    app.listen(process.env.PORT || 4000);
}).catch(err=>
    console.log(err));
