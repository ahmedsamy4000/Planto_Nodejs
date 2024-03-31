const express=require('express');
const app=express();
const port=process.env.PORT||7005;
const bodyparser=require("body-parser");
const path=require('path');
const mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27017/Planto");


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());





//////////////////////////////////////////////////////////
const productRoutes=require("./Routes/ProductRoutes");

app.use("/api/products",productRoutes);



app.listen(port,()=>{console.log("http://localhost:"+port)});