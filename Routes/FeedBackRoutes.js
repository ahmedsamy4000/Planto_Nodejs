const express=require("express");
const router=express.Router();
const feedback_controller=require("../Controllers/FeedBackController");
const AdminPermission = require('../MiddleWares/AdminPermissions');


let courses=[];
let crsID=0;
router.get("/",feedback_controller.getallFeedbacks);

router.get("/:id",feedback_controller.getFeedbackById);

router.post("/",feedback_controller.addNewFeedback);

router.put("/:id",feedback_controller.updateFeedbackById);

router.delete("/:id",feedback_controller.deleteFeedbackById);

module.exports=router;