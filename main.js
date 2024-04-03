const express=require('express');
const app=express();
const port=process.env.PORT||7500;
const bodyparser=require("body-parser");
const path=require('path');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect("mongodb+srv://merafahmy219:NN6AM42JAjsMhdu8@cluster0.a9arhwd.mongodb.net/Planto");

//#region MiddleWares
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors())
//#endregion

//#region Register
const registerRouter=require("./Routes/RegisterRoutes");
app.use("/api/register",registerRouter);
//#endregion

//#region Login
const loginRouter=require("./Routes/LoginRoutes");

app.use("/api/login",loginRouter);
//#endregion

//#region Users
const userRouter=require("./Routes/UserRoutes");
app.use("/api/user",userRouter);
//#endregion

//#region Products
const productRoutes=require("./Routes/ProductRoutes");

app.use("/api/products",productRoutes);
//#endregion


//#region Receipt
const receiptRouter=require("./Routes/ReceiptRoutes");

app.use("/api/receipt",receiptRouter);
//#endregion



//////////////////////////////////////////////////////////////
const feedbackRoutes=require("./Routes/FeedBackRoutes");
app.use("/api/feedbacks",feedbackRoutes);



app.listen(port,()=>{console.log("http://localhost:"+port)});