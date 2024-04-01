const mongoose = require('mongoose');


let FeedBackSchema=new mongoose.Schema({
        "userID":Number,
        "body": String,
        "date":String
})
let feedbacks=mongoose.model("feedback",FeedBackSchema);


var db=mongoose.connection;




class FeedBackModel{
    userID=0;
    body="";
    date="";
    constructor(feedback){
        this.userID=feedback.userID;  
        this.body=feedback.body;
        this.date=feedback.date
    }
    
    static async getallFeedbacks(){
       
       return await feedbacks.find();
    }
    static async findFeedBackById(id){
        let foundFeedback=await feedbacks.findOne({_id:id});
        return foundFeedback;
    }
    async SaveFeedback(){ 
        const newFeedback = new feedbacks({
            userID: this.userID,
            body:this.body,
            date:this.date
        });
        await newFeedback.save();
        return newFeedback;
    }

   static async UpdateFeedBack(id,data){
    console.log("find",await feedbacks.find({_id:id}));
        let result=await feedbacks.updateOne({_id:id},data);
        console.log(result);
       
        if (result.modifiedCount > 0) {
            return true; // Update successful
        } else {
            return false; // No documents were modified
        }
    }
    static async DeletFeedbackByID(id){
        let result=await feedbacks.deleteOne({_id:id});
        console.log(result);
        if(result.deletedCount>0){
            return true;
        }else{
            return false;
        }
    }
    
}

module.exports=FeedBackModel;