const mongoose = require('mongoose');


let FeedBackSchema=new mongoose.Schema({
        userID:Number,
        body: String,
        date:Date
});
module.exports=mongoose.model("feedback",FeedBackSchema);