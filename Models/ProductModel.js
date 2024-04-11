const mongoose = require('mongoose');


let ProductSchema=new mongoose.Schema({
        "name": String,
        "price": String ,
        "description": String,
        "images": Array ,
       "stock": Number,
        "category": String,
        "count": Number,
        "rate" :Number
})  
module.exports=mongoose.model("products",ProductSchema)
