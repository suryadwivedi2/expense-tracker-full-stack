const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');

const app=express();

const userroute=require('./routes/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/expense',userroute);

sequelize.sync()
.then(()=>{
    app.listen(4000);
}).catch(err=>
    console.log(err));
