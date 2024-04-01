

const {ObjectId } = require('mongodb');
const FeedBackValidation=require("../Utils/FeedBackValidation");
const FeedBackModel = require("../Models/FeedBackModel");





let getallFeedbacks= async (req,res)=>{
    let allFeedbacks=await FeedBackModel.getallFeedbacks();
    res.status(200).json({data:allFeedbacks});

};

let getFeedbackById= async (req,res)=>{
    let id =req.params.id;
   let filterFeedback= await FeedBackModel.findFeedBackById(id);
    if(filterFeedback){res.json({message:"Founded",data:filterFeedback})}
    else{res.json({message:"no Feedbacks founded"})}
    
    };

let addNewFeedback= async (req,res)=>{
    
    if(FeedBackValidation(req.body)){
        let newFeedback=new FeedBackModel(req.body);
        newFeedback.SaveFeedback(); 
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
       let result=await FeedBackModel.UpdateFeedBack(id.toHexString(),updatedFeedback);
       if(result){f=1;}
       console.log(result);
       console.log(updatedFeedback);
       console.log(id);
    }else{
        res.json({message:FeedBackValidation.errors[0].message})
    }
    if(f==1){res.json({data:updatedFeedback, message:"Updated Succesfully"})}
    else {res.json({message:"feedback Not Found"})};
}
let deleteFeedbackById= async(req,res)=>{
    let id=new ObjectId(req.params.id);

    let result=await FeedBackModel.DeletFeedbackByID(id.toHexString());
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