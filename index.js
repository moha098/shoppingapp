const express=require('express');
const app=express();
const port=process.env.port || 8070;
const shoppingRoute=require('./routes/shopping-route');
const mongoose=require('mongoose');
const authRoute=require('./auth-route')
const bodyParser=require('body-parser');
const cors=require('cors');


mongoose.connect("mongodb+srv://mohan:passroot@cluster0.yyjbzl2.mongodb.net/shoppingDb",
    (err)=>{
        if(err){
            console.log(err);
        }else {
            console.log("Db connected");
        }
    }
    )

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(bodyParser.json());

app.use('/shopping',shoppingRoute);
app.use('/auth',authRoute);


app.listen(port,()=>{
    console.log("server is connected",port);
});