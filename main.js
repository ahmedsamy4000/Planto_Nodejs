const express=require('express');
const app=express();
const port=process.env.PORT||7005;
const bodyparser=require("body-parser");
const path=require('path');
const mongoose = require('mongoose');



mongoose.connect("mongodb+srv://merafahmy219:NN6AM42JAjsMhdu8@cluster0.a9arhwd.mongodb.net/Planto");

//#region MiddleWares
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
//#endregion


//#region Products
const productRoutes=require("./Routes/ProductRoutes");

app.use("/api/products",productRoutes);
//#endregion


//#region Receipt
const receiptRouter=require("./Routes/ReceiptRoutes");

app.use("/api/receipt",receiptRouter);
//#endregion



app.listen(port,()=>{console.log("http://localhost:"+port)});