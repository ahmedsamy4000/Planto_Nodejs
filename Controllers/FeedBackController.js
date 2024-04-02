

const {ObjectId } = require('mongodb');
const FeedBackValidation=require("../Utils/FeedBackValidation");
const FeedBackModel = require("../Models/FeedBackModel");





let getallFeedbacks= async (req,res)=>{
    
    let allFeedbacks=await FeedBackModel.find();
    res.status(200).json({data:allFeedbacks});

};

let getFeedbackById= async (req,res)=>{
    let id=new ObjectId(req.params.id);
   let filterFeedback= await FeedBackModel.find({_id:id.toHexString()});
    if(filterFeedback.length!=0){
        res.json({message:"Founded",data:filterFeedback})}
    else{res.json({message:"no Feedback founded"})}
    
    };

let addNewFeedback= async (req,res)=>{
    
    if(FeedBackValidation(req.body)){
        let newFeedback=new FeedBackModel(req.body);
        newFeedback.date=Date.now();
        newFeedback.save(); 
       // students.push(newstudent);
        res.status(200).json({data:newFeedback,message:"added successfully"});
    }else{
        res.json({message:FeedBackValidation.errors[0].message});
    }
};
let updateFeedbackById= async(req,res)=>{
    let id=new ObjectId(req.params.id);
    let f=0;
    let updatedFeedback=[];
    if(FeedBackValidation(req.body)){
        req.body.id=id;
         updatedFeedback=req.body;
    let result=await FeedBackModel.updateOne({_id:id.toHexString()},updatedFeedback)
       if(result.modifiedCount>0){f=1;}
    }else{
        res.json({message:FeedBackValidation.errors[0].message})
    }
    if(f==1){res.json({data:updatedFeedback, message:"Updated Succesfully"})}
    else {res.json({message:"feedback Not Found"})};
}
let deleteFeedbackById= async(req,res)=>{
    let id=new ObjectId(req.params.id);

    // let result=await FeedBackModel.DeletFeedbackByID(id.toHexString());
    let result=await FeedBackModel.deleteOne({_id:id.toHexString()});
    console.log(result);
    if(result){ res.json({message:"Deleted Successfully"});}
    else{ res.json({message:"Feedback Not Found"})}
    };


module.exports={
    getallFeedbacks,
    getFeedbackById,
    addNewFeedback,
    updateFeedbackById,
    deleteFeedbackById
}